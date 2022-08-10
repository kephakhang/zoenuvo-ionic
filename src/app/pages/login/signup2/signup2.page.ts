import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { common } from 'src/app/providers/common/common';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})


export class Signup2Page implements OnInit {


  name: string = null;
  mobile: string = null;
  birthday: string = '';
  nation: string = '0';
  gender: string = '0';
  key: string = '';
  user: any;


  constructor(public auth: AuthServiceProvider, private iab: InAppBrowser, private datePipe: DatePipe) { }


  ngOnInit() {
  }


  ionViewWillEnter(){
    this.auth.storage.ready().then(() => {
      this.auth.getStorage(common.VERIFICATION_KEY).then((value) => {
        this.key = value;
        this.auth.getStorage(common.USER).then((value:any)=>{
          if(value != null){
            this.user = value;
            this.mobile = this.user.mobile;
          }
        })
      });
    });
  }


  public close() {
    // var url = '/signup?key=cancel';
    // if (this.key == common.SIGN_UP) {
    //   url = '/signup';
    // } else if (this.key == common.LEVEL_UP || this.key == common.CANCEL_LEAVE) {
    //   url = '/login'
    // } else if (this.key == common.FIND_PW){
    //   url = '/accountadmin'
    // }
    // this.auth.navigateBack(url);
    history.go(-1);
  }


  public signup() {

    if (this.auth.isEmpty(this.name)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'nameInput'));
      return;
    }

    if (this.auth.isEmpty(this.mobile)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'mobileInput'));
      return;
    }

    if(this.user != null && this.mobile != this.user.mobile){
      this.auth.presentAlert('가입하신 휴대폰번호와 일치하지 않는 번호입니다.');
      return;
    }

    // var regexp = new RegExp(regex);
    if (!this.auth.isMobileNumber(this.mobile)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'invalidMobile'));
      return;
    }

    if (this.auth.isEmpty(this.birthday)) {
      this.auth.presentAlert(this.auth.message.get('signup', 'birthdateAlert'));
      return;
    }

    console.log(this.birthday)
    var strBirthday = this.datePipe.transform(this.birthday, 'yyyyMMdd');

    //MGK_IMSI
    // let url = '/signup' ;
    // let user={};
    // user['mobile']=this.mobile;
    // user['name']=this.name;
    // user['birthday'] = strBirthday ;

    // user['gender']='male';

    // let verification: any = {
    //   token: '3e224b68a7264ecc937ea0f8d763a6af000000000001b203',
    //   number: '111111',
    //   media: 'sms',
    //   mobile: 'hFGiWxJg91+trJ3oLJwyXkQdmlMdQ9acJCtT7kcYGjk=',
    //   regDate: '2019-08-15 16:16:49'
    // }

    // user['verification']=verification;

    // this.auth.setStorage(common.VERIFICATION,user).then(() => {
    //   this.auth.navigateBack(url);
    // });

    // if( true ) return ;
    //MGK_IMSI

    console.log(strBirthday)
    // const browser = this.iab.create(environment.apiHostUrl + 'api/jsp/kmcis_web_sample_step02?name=' + this.name + '&phoneNo=' + this.mobile + '&birthDay=' + strBirthday + '&gender=' + this.gender + '&nation=' + this.nation, '_blank', 'location=no');
    const browser = this.iab.create(environment.apiHostUrl + 'api/jsp/kmcis_web_sample_step02?name=' + this.name + '&phoneNo=' + this.mobile + '&birthDay=' + strBirthday + '&gender=' + this.gender + '&nation=' + this.nation, '_blank', 'usewkwebview = yes');

    browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {

      if (event.url.includes('kmcis_web_sample_step04')) {

        browser.executeScript({ code: "var executable = function() { return msg; }; executable();" }).then((values) => {

          let verification = {};
          verification['media'] = 'external';
          verification['number'] = values[0].certNum;
          verification['token'] = values[0].CI;
          browser.close();

          var url = '';

          if (this.key == common.FIND_PW) {
            url = '/pwsearch';
            this.auth.setStorage(common.VERIFICATION, verification).then(() => {
              this.auth.navigateBack(url);
            });
          } else if (this.key == common.CHANGE_PW) {
            url = '/accountadmin';
            this.auth.setStorage(common.VERIFICATION, verification).then(() => {
              this.auth.navigateBack(url);
            });
          } else if (this.key == common.LEAVE) {
            url = '/withdrawal';
            this.auth.setStorage(common.VERIFICATION, verification).then(() => {
              this.auth.navigateBack(url);
            });
          } else if (this.key == common.CHANGE_MOBILE) {
            url = '/accountadmin';
            verification['mobile'] = values[0].phoneNo;
            this.auth.setStorage(common.VERIFICATION, verification).then(() => {
              this.auth.navigateBack(url);
            });
          } else {
            if (this.key == common.SIGN_UP) {
              url = '/signup';
            } else if (this.key == common.LEVEL_UP || this.key == common.CANCEL_LEAVE) {
              url = '/login';
              verification['key'] = this.key;
            }

            let user = {};
            user['mobile'] = values[0].phoneNo;
            user['name'] = values[0].name;
            user['birthday'] = values[0].birthDay;

            if (values[0].gender == '0') {
              user['gender'] = 'male';
            } else {
              user['gender'] = 'female';
            }

            user['verification'] = verification;

            this.auth.setStorage(common.VERIFICATION, user).then(() => {
              this.auth.navigateBack(url);
            });
          }

        },error => {
          console.log('executeScript Error : ' + JSON.stringify(error));
        })
      }

    });
  }




  
}
