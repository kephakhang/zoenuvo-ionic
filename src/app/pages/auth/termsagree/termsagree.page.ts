import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { common } from 'src/app/providers/common/common';

@Component({
  selector: 'app-termsagree',
  templateUrl: './termsagree.page.html',
  styleUrls: ['./termsagree.page.scss'],
})
export class TermsagreePage implements OnInit {

  termsList = [];
  isAllCheck = false;
  termsCheck = {};

  constructor(public auth: AuthServiceProvider, private iab: InAppBrowser) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getNotSignedTermsList();
  }

  public getTermsList() {
    let params = {};
    params['appKey'] = this.auth.package;
    this.auth.post('api/auth/getActiveTermsAll', params).then((res: any) => {
      console.log(res.resultCode);
      if (res.resultCode === 200) {
        this.termsList = res.rows;
        for (var i = 0; i < this.termsList.length; i++) {
          this.termsCheck[this.termsList[i].no.toString()] = false;
        }
      } else {

      }
    }, error => {
      console.log('error : ' + JSON.stringify(error));

    })
  }



  public getNotSignedTermsList() {
    let params = {};
    params['appKey'] = this.auth.package;
    this.auth.post('api/auth/getNotSignedActiveTermsAll', params).then((res: any) => {
      if (res.resultCode === 200) {
        this.termsList = res.rows;
        for (var i = 0; i < this.termsList.length; i++) {
          this.termsCheck[this.termsList[i].no.toString()] = false;
        }
      } else {

      }
    }, error => {

    })
  }

  public showTerms(terms: any) {
    document.location.href = terms.url;
  }



  public termsAllChanged() {
    setTimeout(() => {
      for (var i = 0; i < this.termsList.length; i++) {
        this.termsCheck[this.termsList[i].no.toString()] = this.isAllCheck;
      }
    });

  }

  public termsChanged() {
    var isAll = true;
    for (var i = 0; i < this.termsList.length; i++) {
      if (!this.termsCheck[this.termsList[i].no.toString()]) {
        isAll = false;
        break;
      }
    }

    this.isAllCheck = isAll;
  }

  back() {
    history.go(-1);
  }

  complete() {

    var value = ""

    for (var i = 0; i < this.termsList.length; i++) {
      if (!this.termsCheck[this.termsList[i].no.toString()] && !this.termsList[i].compulsory) {
        this.auth.presentAlert(this.auth.message.get('signup', 'agreeTerms'));
        return;
      }

      if (this.termsCheck[this.termsList[i].no.toString()]) {
        if (i != 0) {
          value += ","
        }
        value += + this.termsList[i].no
      }
    }

    let params = {}
    params['termsNo'] = value;
    console.log(JSON.stringify(value));

    this.auth.post('api/auth/agreeTermsList', params).then((res: any) => {
      console.log(res.resultCode);
      if (res.resultCode === 200) {
        this.auth.setStorage(common.TERMS, true).then(() => {
          history.go(-1);
        })
      }else{

      }
    }, error => {
      console.log('error : ' + JSON.stringify(error));
    })
  }
}
