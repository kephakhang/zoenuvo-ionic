import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';

@Component({
  selector: 'app-idsearch',
  templateUrl: './idsearch.page.html',
  styleUrls: ['./idsearch.page.scss'],
})


export class IdsearchPage implements OnInit {


  mobile:string = null;
  authNumber:string = null;
  verfication:any;


  constructor(public auth:AuthServiceProvider) { }


  public back(){
    history.go(-1)
  }

  
  ngOnInit() {
  }


  // 인증요청 버튼
  public request(){
    if(this.auth.isEmpty(this.mobile)){
      this.auth.presentAlert(this.auth.message.get('signup', 'mobileInput'));
      return;
    }else if(!this.auth.isMobileNumber(this.mobile)){
      this.auth.presentAlert(this.auth.message.get('signup', 'invalidMobile'));
      return;
    }else{
      this.reqVerification();
    }
  }


  // 인증확인 버튼
  public confirm(){
    if(this.verfication == null){
      this.auth.presentAlert(this.auth.message.get('signup', 'doMobileAuth'));
      return;
    }else if(this.auth.isEmpty(this.authNumber)){
      this.auth.presentAlert(this.auth.message.get('signup', 'doMobileAuth'));
      return;
    }else {
      this.checkVerification();
    }
  }


  private async checkVerification(){
    let params = {};
    params['number'] = this.authNumber;
    params['token'] = this.verfication.token;
    params['mobile'] = this.mobile;
    params['media'] = 'sms';
    this.auth.post('api/auth/getUserByVerification',params).then((res:any)=>{
      if(res.resultCode === 200){
        this.auth.setStorage(common.FIND_ID, res.row).then(()=>{
          this.auth.navigateForward('/idsearch2');
        });
      }else{
        this.auth.presentAlert(this.auth.message.get('idsearch', 'failedVerfication'));
      }
    }, error=>{
      this.auth.presentAlert(this.auth.message.get('idsearch', 'failedVerfication'));
    });
  }


  private async reqVerification(){
    let params = {};
    params['media'] = 'sms';
    params['mobile'] = this.mobile;
    params['type'] = 'findId';
    this.auth.post('api/verification/request',params).then((res:any)=>{
      if(res.resultCode === 200){
        this.verfication = res.row;
        this.auth.presentAlert(this.auth.message.get('idsearch', 'requestSms'));
      }else{
        this.auth.presentAlert(this.auth.message.get('idsearch', 'notJoinedMobile'));
      }
    }, error=>{
      this.auth.presentAlert(this.auth.message.get('idsearch', 'notJoinedMobile'));
    });
  }




}
