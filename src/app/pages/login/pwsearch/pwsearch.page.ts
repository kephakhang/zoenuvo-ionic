import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';
import { environment } from 'src/environments/environment';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-pwsearch',
  templateUrl: './pwsearch.page.html',
  styleUrls: ['./pwsearch.page.scss'],
})


export class PwsearchPage implements OnInit {


  isSms: boolean = false;
  loginId: string;
  mobile: string;
  authNumber: string;
  verification: any;


  constructor(public auth: AuthServiceProvider, public iab: InAppBrowser) {
    this.isSms = false;
  }


  public close() {
    this.auth.navigateBack('/login')
  }


  ngOnInit() {
  }


  ionViewWillEnter() {
    this.auth.getStorage(common.VERIFICATION).then((value) => {
      console.log('pwsearch verification = ' + JSON.stringify(value));
      if (value != null) {
        this.verification = value;
        this.verification.loginId = this.loginId;
        this.auth.setStorage(common.VERIFICATION, this.verification).then(() => {
          this.auth.navigateForward('/pwsearch2');
        });
      }
    });
  }


  public async authCheck() {
    if (this.auth.isEmpty(this.authNumber)) {
      this.auth.presentAlert(this.auth.message.get('idsearch', 'inputAuthNumber'));
      return;
    }
    let params = {};
    params['number'] = this.authNumber;
    params['token'] = this.verification.token;
    params['media'] = 'sms';
    this.auth.post('api/auth/getUserByLoginIdAndMobile', params).then((res: any) => {
      if (res.resultCode === 200) {
        this.verification.loginId = this.loginId;
        this.auth.setStorage(common.VERIFICATION, this.verification).then(() => {
          this.auth.navigateForward('/pwsearch2');
        });
      }
    });
  }


  public back() {
    history.go(-1)
  }


  // 인증요청
  public async checkUser() {

    if (this.auth.isEmpty(this.loginId)) {
      this.auth.presentAlert(this.auth.message.get('login', 'idInput'));
      return;
    } else if (this.auth.isEmpty(this.mobile)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'mobileInput'));
      return;
    } else if (!this.auth.isMobileNumber(this.mobile)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'invalidMobile'));
      return;
    } else {

      let params = {};
      params['loginId'] = this.loginId;
      params['mobile'] = this.mobile;

      this.auth.post('api/auth/getUserByLoginIdAndMobile', params).then((res: any) => {
        if (res.resultCode === 200) {
          let data = res.row;
          if (data == null) {
            this.auth.presentAlert(this.auth.message.get('login', 'notSignedUser'));
          } else {
            if (data.page == null) {
              this.auth.promptAlert(this.auth.message.get('idsearch', 'alertReqSms')).then((res: boolean) => {
                if (res) {
                  this.request();
                }
              });
            } else {
              this.auth.promptAlert(this.auth.message.get('idsearch', 'alertReqAuthMe')).then((res: boolean) => {
                if (res) {
                  // this.auth.setStorage(common.VERIFICATION_KEY, common.FIND_PW).then(() => {
                    // this.auth.navigateForward('/signup2');
                    // 본인인증 절차 띄우기
                  // });
                  this.authPassword();
                }
              });
            }
          }
        } else {
          this.auth.presentAlert(this.auth.message.get('login', 'notSignedUser'));
        }
      }, error => {
        this.auth.presentAlert(this.auth.message.get('login', 'notSignedUser'));
      });
    }
  }


  authPassword() {
    var browserUrl = environment.apiHostUrl + 'api/jsp/kmcis_web_sample_step02';

    const browser = this.iab.create(browserUrl, '_blank', 'usewkwebview = yes');

    browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {

      if (event.url.includes('appscheme')) {

        var msg = event.url.substring(27, event.url.length);
        msg = decodeURI(msg);
        var msgArr = JSON.parse(msg);

        let verification = {};
        verification['media'] = 'external';
        verification['number'] = msgArr.certNum;
        verification['token'] = msgArr.CI;
        verification['loginId'] = this.loginId;

        this.auth.setStorage(common.VERIFICATION, verification);
        browser.close();
        var url = '';
        url = '/pwsearch2';
        this.auth.navigateBack(url);
      }
    });
  }



  private async request() {
    let params = {};
    params['loginId'] = this.loginId;
    params['mobile'] = this.mobile;
    params['media'] = 'sms';
    params['type'] = 'findPassword';
    this.auth.post('api/auth/getUserByLoginIdAndMobile', params).then((res: any) => {
      if (res.resultCode === 200) {
        this.verification = res.row;
        if (this.verification != null) {
          this.isSms = true;
          this.auth.presentAlert(this.auth.message.get('idsearch', 'requestSms'));
        }
      }
    });
  }





}
