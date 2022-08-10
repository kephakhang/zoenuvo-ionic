import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';

@Component({
  selector: 'app-idsearch2',
  templateUrl: './idsearch2.page.html',
  styleUrls: ['./idsearch2.page.scss'],
})
export class Idsearch2Page implements OnInit {

  loginId:string;
  constructor(public auth:AuthServiceProvider) { }

  public close() {
    this.auth.navigateBack('/login')
  }

  ngOnInit() {
    this.auth.getStorage(common.FIND_ID).then((value=>{
      let user = value;
      if(user != null){
        if(user.accountType == 'pplus'){
          this.loginId = user.loginId;
        }else if(user.accountType == 'facebook'){
          this.auth.presentAlert(this.auth.message.get('idsearch', 'signedFacebook'));
        }else if(user.accountType == 'google'){
          this.auth.presentAlert(this.auth.message.get('idsearch', 'signedGoogle'));
        }
      }
      
    }))
  }

  public login(){
    this.auth.navigateRoot('/login')
  }

  public pwSearch(){
    this.auth.navigateForward('/pwsearch')
  }

  public back(){
    history.go(-1)
  }

}
