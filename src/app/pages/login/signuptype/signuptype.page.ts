import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';

@Component({
  selector: 'app-signuptype',
  templateUrl: './signuptype.page.html',
  styleUrls: ['./signuptype.page.scss'],
})
export class SignuptypePage implements OnInit {

  page = {};
  params = {};

  constructor(public auth: AuthServiceProvider) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.params['page'] = this.page;
  }

  delivery(){
    this.page['type'] = 'shop';
    console.log(JSON.stringify(this.page));
    this.update();
  }

  offline(){
    this.page['type'] = 'store';
    console.log(JSON.stringify(this.page));    
    this.update();
  }

  individual(){
    this.page['type'] = 'person';
    console.log(JSON.stringify(this.page));    
    this.update();
  }

  update(){
    const extraData: any = {
      page: this.page
    };
    this.auth.navigateForward('/signup', extraData);
  }

}
