import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';


@Component({
  selector: 'page-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})


export class SignupPage implements OnInit {


  signupId: string = null;
  signupPassword: string = null;
  isCheckId = false;
  isVisible = false;
  isAuthed = false;
  isLevelup = false;
  user = {};
  termsList = [];
  isAllCheck = false;
  termsCheck = {};
  key: string = null;

  page: any;


  constructor(public auth: AuthServiceProvider, private iab: InAppBrowser) {
    console.log('constructor');
    this.isAuthed = false;
  }


  ngOnInit() {}


  ionViewWillEnter() {

    this.auth.getNavigationExtra().then((value: any) => {
      this.page = value.page;
    });

    this.auth.getStorage(common.SIGNUP_KEY).then((value: any) => {
      this.key = value;
      if (this.key == null || this.key == common.SIGN_UP) {
        this.getTermsList();
        this.isLevelup = false;
      } else if (this.key == common.LEVEL_UP) {
        this.getNotSignedTermsList();
        this.isLevelup = true;
      }
      this.auth.getStorage(common.VERIFICATION).then((value) => {
        if (value != null) {
          this.auth.storage.remove(common.VERIFICATION);
          this.user = value;
          this.isAuthed = true;
          if (this.key == null || this.key == common.SIGN_UP) {
            this.checkJoinedUser();
          }
        }
      });
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
    })
  }


  public getTermsList() {
    let params = {};
    params['appKey'] = this.auth.package;
    this.auth.post('api/auth/getActiveTermsAll', params).then((res: any) => {
      if (res.resultCode === 200) {
        this.termsList = res.rows;
        for (var i = 0; i < this.termsList.length; i++) {
          this.termsCheck[this.termsList[i].no.toString()] = false;
        }
      } else {
      }
    })
  }


  public showTerms(terms: any) {
    document.location.href = terms.url;
  }


  public checkId() {

    if (this.signupId.length < 4) {
      this.isVisible = false;
      this.isCheckId = false;
      return;
    }
    this.isVisible = true;

    if (/.*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*/.test(this.signupId)) {
      this.isCheckId = false;
      return;
    }

    this.auth.getNotLoading('api/user/check?loginId=' + this.signupId).then((res: any) => {
      if (res.resultCode === 200) {
        let data = res.row;
        if (data == 'success') {
          this.isCheckId = true;
        } else {
          this.isCheckId = false;
        }
      }
    })
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


  public signup2() {
    this.auth.setStorage(common.VERIFICATION_KEY, common.SIGN_UP).then(() => {
      this.auth.navigateForward('/signup2');
    });
  }


  public signupcomplete() {

    if (this.key == null || this.key == common.SIGN_UP) {
      let params = {};

      if (this.auth.isEmpty(this.signupId)) {
        this.auth.presentAlert(this.auth.message.get('signup', 'idInput'));;
        return;
      }

      if (!this.isCheckId) {
        this.auth.presentAlert(this.auth.message.get('signup', 'unUsableId'));;
        return;
      }

      if (this.auth.isEmpty(this.signupPassword)) {
        this.auth.presentAlert(this.auth.message.get('signup', 'pwInput'));
        return;
      }

      if (this.signupPassword.length < 4) {
        this.auth.presentAlert(this.auth.message.get('idsearch', 'pwInputOver4'));
        return;
      }

      if (!this.isAuthed || this.user == null) {
        this.auth.presentAlert(this.auth.message.get('signup', 'doMobileAuth'));
        return;
      }

      let agreeTermsList = [];

      for (var i = 0; i < this.termsList.length; i++) {

        if (!this.termsCheck[this.termsList[i].no.toString()] && this.termsList[i].compulsory) {
          this.auth.presentAlert(this.auth.message.get('signup', 'agreeTerms'));
          return;
        }

        if (this.termsCheck[this.termsList[i].no.toString()]) {
          agreeTermsList.push(this.termsList[i].no);
        }
      }

      params['loginId'] = this.signupId;
      params['password'] = this.signupPassword;
      params['accountType'] = 'pplus';
      params['verification'] = this.user['verification'];
      params['mobile'] = this.user['mobile'];
      params['name'] = this.user['name'];
      params['birthday'] = this.user['birthday'];
      params['gender'] = this.user['gender'];
      params['termsList'] = agreeTermsList;

      if (this.auth.platform.is('android')) {
        params['platform'] = 'aos';

      } else if (this.auth.platform.is('ios')) {
        params['platform'] = 'ios';

      } else {
        params['platform'] = 'web';
      }

      params['page'] = this.page;

      let number = {};
      number['number'] = this.user['mobile'];
      params['number'] = number;
      this.auth.promptAlert(this.auth.message.get('signup', 'alertConfirmJoin')).then((res: boolean) => {
        if (res) {
          this.join(params);
        }
      });

    } else {

      let params = {};
      let agreeTermsList = [];

      for (var i = 0; i < this.termsList.length; i++) {
        if (!this.termsCheck[this.termsList[i].no.toString()] && !this.termsList[i].compulsory) {
          this.auth.presentAlert(this.auth.message.get('signup', 'agreeTerms'));
          return;
        }
        if (this.termsCheck[this.termsList[i].no.toString()]) {
          agreeTermsList.push(this.termsList[i].no);
        }
      }

      this.auth.getStorage(common.USER).then(value => {

        params['page'] = this.page;
        params['termsList'] = agreeTermsList;
        params['verification'] = this.user['verification'];
        params['mobile'] = this.user['mobile'];
        params['name'] = this.user['name'];
        params['birthday'] = this.user['birthday'];
        params['gender'] = this.user['gender'];

        let number = {};
        number['number'] = this.user['mobile'];
        params['number'] = number;

        params['no'] = value.no;

        this.levelUp(params, value.password)
      })
    }
  }

  private async levelUp(params, password) {

    this.auth.post2('api/auth/levelup', params).then((res: any) => {
      if (res.resultCode === 200) {
        let user = res.row;
        user.password = password;
        this.auth.setStorage(common.USER, user).then(() => {
          this.auth.navigateForward('/signupcomplete');
        });
      } else {
        if (res.resultCode == 587) {
          this.auth.presentAlert(this.auth.message.get('signup', 'agreeTermsCompulsory'));
        } else {
          this.auth.presentAlert(this.auth.message.get('signup', 'failedJoin'));
        }
      }
    });
  }


  private async join(params) {

    this.auth.post2('api/auth/join', params).then((res: any) => {
      if (res.resultCode === 200) {

        let user = res.row;
        user.password = params['password'];
        this.auth.setStorage(common.USER, user).then(() => {
          this.auth.navigateForward('/signupcomplete');
        });

      } else {
        if (res.resultCode == 587) {
          this.auth.presentAlert(this.auth.message.get('signup', 'agreeTermsCompulsory'));
        } else if (res.resultCode == 583) {
          this.auth.presentAlert(this.auth.message.get('signup', 'joinedId'));
        } else if (res.resultCode == 503) {
          this.auth.presentAlert(this.auth.message.get('signup', 'invalidRecommendKey'));
        } else {
          this.auth.presentAlert(this.auth.message.get('signup', 'failedJoin'));
        }

      }
    });
  }


  private async checkJoinedUser() {
    let params = {};
    params['mobile'] = this.user['mobile'];
    this.auth.post('api/auth/existsUser', params).then((res: any) => {
      if (res.resultCode === 200) {
        this.auth.presentAlert(this.auth.message.get('signup', 'joinedUser'));
        this.close();
      }
    })
  }


  public close() {
    this.auth.navigateBack('/login')
  }







  
}
