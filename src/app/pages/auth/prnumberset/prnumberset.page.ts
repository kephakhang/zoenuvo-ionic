import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { IonRadio } from '@ionic/angular';

@Component({
  selector: 'app-prnumberset',
  templateUrl: './prnumberset.page.html',
  styleUrls: ['./prnumberset.page.scss'],
})
export class PrnumbersetPage implements OnInit {

  prNumberType = "";
  storeNumber1: any;
  storeNumber2: any;
  mobileNumber:string = null;
  // mobile:string = null;
  prNumber = "";


  constructor(public auth: AuthServiceProvider) { }

  ngOnInit() {
  }

  close(){
    history.go(-1);
  }

  storeSelect(){
    this.prNumberType = "store";
    this.mobileNumber = null
  }

  mobileSelect(){
    this.prNumberType = "mobile";
    this.storeNumber1 = null;
    this.storeNumber2 = null;
  }

  complete(){
    if(this.auth.isEmpty(this.mobileNumber)){
      this.prNumber = this.storeNumber1 + this.storeNumber2;
    }else{
      this.prNumber = this.mobileNumber;
    }
    this.prNumberAlert()
  }

  async prNumberAlert() {
    const alert = await this.auth.alertCtrl.create({
      cssClass: 'prnumbersetAlert',
      header: this.prNumber,
      subHeader: '등록된 PR넘버는 변경이 불가하니 신중하게 선택하시기 바랍니다',
      message: '입력하신 정보와 PR넘버로 회원가입 하시겠습니까?',
      buttons: [
        {
          text: '취소',
        },
        {
          text: '확인',
          handler: () => {
          console.log('확인');
          }
        }
      ],
    });
    alert.present();
  }


}
