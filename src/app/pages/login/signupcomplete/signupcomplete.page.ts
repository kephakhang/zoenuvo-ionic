import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';
import { common } from 'src/app/providers/common/common';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-signupcomplete',
  templateUrl: './signupcomplete.page.html',
  styleUrls: ['./signupcomplete.page.scss'],
})
export class SignupcompletePage implements OnInit {
  pushToken:string = null;
  constructor(public auth:AuthServiceProvider, private device:Device) { 
    if(this.auth.platform.is('android') || this.auth.platform.is('ios')){

      this.auth.storage.ready().then(()=>{
        this.auth.storage.get(common.PUSH_TOKEN).then((res)=>{
          this.pushToken = this.pushToken;
        });
      });
    }else{
      this.pushToken = 'no_push_token'
    }
  }

  public complete(){

    this.auth.getStorage(common.USER).then((res:any)=>{
      this.login(res)
    });


  }

  ngOnInit() {
  }

  public async login(res:any) {
    const params: any = {};
    params['loginId'] = res.loginId;
    params['password'] = res.password;
    this.auth.post('api/auth/login', params)
      .then((res: any) => {
        var json = res ; //JSON.parse(res);
        console.log(res.resultCode);
        if(res.resultCode === 200){

          let data = res.row;
          data['passowrd'] = res.password;
          this.auth.promptAlert(this.auth.message.get('login', 'alamPopup')).then((res:boolean)=>{
            if(res){
              this.regDevice(data, true);
            }else{
              this.regDevice(data, false);
            }
          });
        }else{
          if(res.resultCode == 503){
            this.auth.presentAlert(this.auth.message.get('login', 'notSignedUser'));
          }else{

          }
        }

      }, (error: any) =>{
      });
  }

  private async regDevice(user, pushActivate:boolean){
    const params = {};

    let installedApp = {};
    installedApp['appKey'] = this.auth.package;
    installedApp['version'] = this.auth.version;
    installedApp['isPushActivate'] = pushActivate;
    var pushMask = '0000000000000000';
    if(pushActivate){
      pushMask = '1111111111111111';
    }
    installedApp['pushMask'] = pushMask;
    installedApp['pushKey'] = this.pushToken;

    let device = {};
    device['deviceId'] = this.device.uuid;
    if(this.auth.platform.is('android')){
      device['platform'] = 'aos';
    }else if(this.auth.platform.is('ios')){
      device['platform'] = 'ios';
    }else{
      device['platform'] = 'pcweb';
    }

    device['installedApp'] = installedApp;

    params['no'] = user.no;
    params['device'] = device;
    this.auth.post2('api/auth/registDevice', params)
      .then((res:any)=>{

        if(res.resultCode === 200){
          let data = res.row;

          user.device = data.device;
          user.talkDenyDay = data.talkDenyDay;
          user.talkDenyStartTime = data.talkDenyStartTime;
          user.talkDenyEndTime = data.talkDenyEndTime;
          user.modDate = data.modDate;
          user.sessionKey = data.sessionKey;
  
          this.auth.setStorage(common.USER, user).then(()=>{
            this.auth.setStorage(common.AUTO_LOGIN, true);
            this.auth.loadContact();
            // this.auth.navigateRoot('/main2');
            this.auth.navigateRoot('/mainintro');

          });
        }
        
        
      }, (error: any) =>{
      });
  }

}
