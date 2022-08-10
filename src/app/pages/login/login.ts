import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'page-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})


export class LoginPage {

  isFacebookLogin: boolean = false;
  facebookUser: any = null;
  invalidFieldDesc = '';
  loginId: string = null;
  password: string = null;
  autoLogin: boolean = true;
  user: any = null;


  constructor(public auth: AuthServiceProvider) {
    console.log('AUTO_LOGIN');
    this.auth.getStorage(common.AUTO_LOGIN).then((res) => {
      if (res != null) {
        this.autoLogin = res;
      }
    });
  }


  ionViewWillEnter() {
    console.log('loginPage ionViewWillEnter');
    this.auth.getStorage(common.VERIFICATION).then((value) => {
      if (value != null) {
        this.auth.storage.remove(common.VERIFICATION);
        this.user = value;
        console.log('CANCEL_LEAVE');
        if (this.user.verification.key === common.CANCEL_LEAVE) {
          this.auth.promptAlert('탈퇴회원을 복구하시겠습니까?').then((res: any) => {
            if (res) {
              this.cancelLeave(value.verification);
            }
          })
        } else if (this.user.verification.key === common.LEVEL_UP) {
          console.log('LEVEL_UP');
          this.auth.setStorage(common.SIGNUP_KEY, common.LEVEL_UP).then(() => {
            this.auth.setStorage(common.VERIFICATION, value).then(() => {
              this.auth.navigateForward('/signuptype');
            }, err => {
              console.log(err);
            });
          });
        }
      }
    });
    this.auth.getStorage(common.TERMS).then((value) => {
      if (value != null && value) {
        this.auth.storage.remove(common.TERMS);
        this.auth.setStorage(common.AUTO_LOGIN, this.autoLogin).then(() => {
          this.auth.loadContact();
          this.auth.navigateRoot('/appmain');
        });
      }
    })
  }


  private async cancelLeave(verification: any) {
    this.auth.getStorage(common.USER).then((value: any) => {
      let params = {};
      params['number'] = verification.number;
      params['token'] = verification.token;
      params['media'] = verification.media;
      params['mobile'] = this.user.mobile;
      params['loginId'] = value.loginId;
      this.auth.post('api/auth/cancelLeave', params).then((res: any) => {
        if (res.resultCode == 200) {
          this.auth.presentAlert('복구가 완료되었습니다.');
          this.auth.setStorage(common.AUTO_LOGIN, this.autoLogin).then(() => {
            this.auth.loadContact();
            this.auth.getStorage(common.USER).then((value: any) => {
              value.useStatus = 'normal';
              this.auth.setStorage(common.USER, value).then(() => {
                this.auth.navigateRoot('/appmain');
              });
            });
          });
        }
      });
    });
  }


  public prepayment() {
    this.auth.navigateForward('/prepayment')
  }


  public signup() {
    this.auth.setStorage(common.SIGNUP_KEY, common.SIGN_UP).then(() => {
      this.auth.navigateForward('/signuptype');
    });
  }


  public idSearch() {
    this.auth.navigateForward('/idsearch');
  }


  public pwSearch() {
    this.auth.navigateForward('/pwsearch');
  }


  public async login() {
    if (this.auth.isEmpty(this.loginId)) {
      this.auth.presentAlert(this.auth.message.get('login', 'idInput'));
      return;
    }
    if (this.auth.isEmpty(this.password)) {
      this.auth.presentAlert(this.auth.message.get('login', 'pwInput'));
      return
    }
    const params: any = {};
    params['loginId'] = this.loginId;
    params['password'] = this.password;
    this.auth.post('api/auth/login', params)
      .then((res: any) => {
        var json = res;
        if (res.resultCode === 200) {
          let data = res.row;
          data.password = this.password;
          this.existsDevice(data);
        } else {
          if (res.resultCode == 503) {
            this.auth.presentAlert(this.auth.message.get('login', 'notSignedUser'));
          } else if (res.resultCode == 580) {
            this.auth.presentAlert(this.auth.message.get('login', 'invalidPassword'));
          }
        }
      });
  }


  private async existsDevice(user: any) {
    const params: any = {};
    params['no'] = user.no;
    params['device.deviceId'] = this.auth.deviceId;
    params['device.installedApp.appKey'] = this.auth.package;
    params['device.installedApp.version'] = this.auth.version;
    this.auth.post('api/auth/existsDevice', params).then((res: any) => {
        console.log(res.resultCode);
        if (res.resultCode === 200) {
          let data = res.row;
          if (data == null || data.device == null || data.device.installedApp == null || this.auth.isEmpty(data.device.installedApp.pushKey) || this.auth.pushToken != data.device.installedApp.pushKey) {
            this.regDevice(user, true);
          } else {
            user.device = data.device;
            user.talkDenyDay = data.talkDenyDay;
            user.talkDenyStartTime = data.talkDenyStartTime;
            user.talkDenyEndTime = data.talkDenyEndTime;
            user.modDate = data.modDate;
            user.sessionKey = data.sessionKey;
            this.auth.setStorage(common.USER, user).then(() => {
              this.loginCheck(user);
            });
          }
        } else {
          this.auth.promptAlert(this.auth.message.get('login', 'alamPopup')).then((res: boolean) => {
            if (res) {
              this.regDevice(user, true);
            } else {
              this.regDevice(user, false);
            }
          });
        }
      }, (error: any) => {
        this.auth.promptAlert(this.auth.message.get('login', 'alamPopup')).then((res: boolean) => {
          if (res) {
            this.regDevice(user, true);
          } else {
            this.regDevice(user, false);
          }
        });
      });
  }


  private async regDevice(user: any, pushActivate: boolean) {
    const params = {};
    console.log('appkey : ' + this.auth.package);
    console.log('deviceId : ' + this.auth.deviceId);
    let installedApp = {};
    installedApp['appKey'] = this.auth.package;
    installedApp['version'] = this.auth.version;
    installedApp['pushActivate'] = pushActivate;
    var pushMask = '0000000000000000';
    if (pushActivate) {
      pushMask = '1111111111111111';
    }
    installedApp['pushMask'] = pushMask;
    installedApp['pushKey'] = this.auth.pushToken;
    let device = {};
    device['deviceId'] = this.auth.deviceId;
    if (this.auth.platform.is('android')) {
      device['platform'] = 'aos';
    } else if (this.auth.platform.is('ios')) {
      device['platform'] = 'ios';
    } else {
      device['platform'] = 'pcweb';
    }
    device['installedApp'] = installedApp;
    params['no'] = user.no;
    params['device'] = device;
    this.auth.post2('api/auth/registDevice', params)
      .then((res: any) => {
        if (res.resultCode === 200) {
          let data = res.row;
          user.device = data.device;
          user.talkDenyDay = data.talkDenyDay;
          user.talkDenyStartTime = data.talkDenyStartTime;
          user.talkDenyEndTime = data.talkDenyEndTime;
          user.modDate = data.modDate;
          user.sessionKey = data.sessionKey;
          this.auth.setStorage(common.USER, user).then(() => {
            this.loginCheck(user);
            this.auth.setStorage(common.PAGE, user.page).then(() => {
            });
          });
        }
      });
  }


  private async loginCheck(user: any) {
    if (user.certificationLevel != null && user.certificationLevel!! < 11) {
      this.auth.promptAlert(this.auth.message.get('login', 'verificationPopup')).then((res: boolean) => {
        if (res) {//ok 본인인증 미인증 회원 인증처리
          if (res) {
            this.auth.setStorage(common.VERIFICATION_KEY, common.LEVEL_UP).then(() => {
              this.auth.navigateForward('/signup2');
            });
          }
        } else {//cancel
        }
      });
    } else {
      if (user.useStatus == 'waitingToLeave') {
        console.log(user.sessionKey);
        this.auth.promptAlert(this.auth.message.get('login', 'waitingToLeavePopup')).then((res: boolean) => {
          if (res) {//ok 탈퇴대기 취소 인증 프로세스
            this.auth.setStorage(common.VERIFICATION_KEY, common.CANCEL_LEAVE).then(() => {
              this.auth.navigateForward('/signup2');
            });
          } else {//cancel
          }
        });
      } else {
        let page = user.page;
        if (page != null) {
          environment.isDeliveryOrderable = page.isDeliveryOrderable;
          environment.isPackingOrderable = page.isPackingOrderable;
          environment.isShopOrderable = page.isShopOrderable;
          this.getNotSignedTermsList()
        }
      }
    }
  }


  private getNotSignedTermsList() {
    let params = {};
    params['appKey'] = this.auth.package;
    this.auth.post('api/auth/getNotSignedActiveTermsAll', params).then((res: any) => {
      if (res.resultCode === 200) {
        for (let terms of res.rows) {
          if (terms.compulsory) {
            this.auth.navigateForward('/termsagree');
            return;
          }
        }
        this.auth.setStorage(common.AUTO_LOGIN, this.autoLogin).then(() => {
          this.auth.loadContact();
          this.auth.navigateRoot('/appmain');
        });
      }
    })
  }





}

