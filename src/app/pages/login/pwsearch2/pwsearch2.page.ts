import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';


@Component({
  selector: 'app-pwsearch2',
  templateUrl: './pwsearch2.page.html',
  styleUrls: ['./pwsearch2.page.scss'],
})


export class Pwsearch2Page implements OnInit {


  verification:any;
  password:string;


  constructor(public auth:AuthServiceProvider) { }


  public back(){
    history.go(-1)
  }


  ngOnInit() {
  }


  ionViewWillEnter(){
    this.auth.getStorage(common.VERIFICATION).then((value) => {
      console.log('common.VERFICATION = ' + JSON.stringify(value));

      if (value != null) {
        this.auth.storage.remove(common.VERIFICATION);
        this.verification = value;
      }

    });
  }


  public async change(){

    if(this.auth.isEmpty(this.password)){
      this.auth.presentAlert(this.auth.message.get('idsearch', 'pwInputIntro'));
    }

    if(this.password.length < 4){
      this.auth.presentAlert(this.auth.message.get('idsearch', 'pwInputOver4'));
      return;
    }

    let params = {};

    params['loginId'] = this.verification.loginId;
    params['number'] = this.verification.number;
    params['password'] = this.password;
    params['token'] = this.verification.token;

    this.auth.post('api/auth/changePasswordByVerification', params).then((res:any)=>{

      console.log(res.resultCode);

      if(res.resultCode === 200){

        this.auth.getStorage(common.USER).then((value)=>{

          if(value == null){
            this.auth.presentAlert(this.auth.message.get('idsearch', 'changedPassword'));
            // this.auth.navigateRoot('/login');
            history.go(-2);

          }else{
            this.auth.presentAlert(this.auth.message.get('idsearch', 'changedPassword'));
            value.password = this.password;
            this.auth.setStorage(common.USER, value).then(()=>{
              // this.auth.navigateBack('/accountadmin');
              history.go(-1);
            });

          }
        })
        
      }
    });
  }




}
