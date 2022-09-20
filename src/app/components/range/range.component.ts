import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TenantData } from '../../model/tenant-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonParamData } from '../../model/common-param-data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-id-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements OnInit {
  @Input() title: string;
  @Input() confirm: string;
  @Input() isUpdate: boolean;
  @Input() isRange: boolean;
  @Input() selectedOption: String;
  @Input() options: string[];
  @ViewChild('autoInput') input;
  @ViewChild('start') startInput;
  @ViewChild('end') endInput;
  tenantList: TenantData[] = [];
  filteredOptions$: Observable<string[]>;

  constructor(public auth: AuthServiceProvider) {}

  ngOnInit(): void {
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  dismiss() {
    this.ref.close();
  }

  submit() {
    const start = this.startInput.nativeElement.value.trim();
    const end = this.endInput.nativeElement.value.trim();
    if (start === '' || end === '') {
      this.auth.showError('start or end value is not defined');
      return;
    }

    if (start.length !== end.length) {
      this.auth.showError(
        'The length of start value is different from the length fo end value'
      );
      this.ref.close();
      return;
    }

    let prefix = '';
    let offset1 = '';
    let offset2 = '';
    const match = start.match(/^[a-z,A-Z,0-9,\-,_]+[a-z,A-Z,\-,_]+/);
    if (match) {
      match.sort(function (a, b) {
        return b.length - a.length;
      });

      prefix = match[0];
      if (!end.startsWith(prefix)) {
        this.auth.showError('end value has diffrent prefix from start value');
        this.ref.close();
        return;
      }
      const numMatch = start.substring(match[0].length).match(/^[0-9]+$/);
      if (numMatch) {
        numMatch.sort(function (a, b) {
          return b.length - a.length;
        });
        offset1 = numMatch[0];

        const numMatch2 = end.substring(prefix.length).match(/^[0-9]+$/);
        if (numMatch2) {
          numMatch2.sort(function (a, b) {
            return b.length - a.length;
          });
          offset2 = numMatch2[0];

          if (this.isUpdate) {
            this.ref.close(
              new CommonParamData(
                null,
                this.input.nativeElement.value,
                prefix,
                offset1,
                offset2
              )
            );
          } else {
            this.ref.close(
              new CommonParamData(null, null, prefix, offset1, offset2)
            );
          }
        } else {
          this.auth.showError('end value have to have number postfix');
          this.ref.close();
        }
      } else {
        this.auth.showError('start or end value have to have number postfix');
        this.ref.close();
      }
    } else {
      this.auth.showError('start or end value have to have named prefix');
      this.ref.close();
    }
  }

  submit2() {
    this.ref.close(
      new CommonParamData(
        null,
        this.input.nativeElement.value,
        null,
        null,
        null
      )
    );
  }
}
