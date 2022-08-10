import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';

@Component({
  selector: 'app-prsetintro',
  templateUrl: './prsetintro.page.html',
  styleUrls: ['./prsetintro.page.scss'],
})
export class PrsetintroPage implements OnInit {

  constructor(public auth: AuthServiceProvider) { }

  ngOnInit() {
  }

  complete(){
    this.auth.navigateForward('/prnumberset');
  }

}
