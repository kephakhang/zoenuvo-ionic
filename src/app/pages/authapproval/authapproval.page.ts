import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from 'src/app/providers/auth-service/auth-service';

@Component({
  selector: 'app-authapproval',
  templateUrl: './authapproval.page.html',
  styleUrls: ['./authapproval.page.scss'],
})
export class AuthapprovalPage implements OnInit {

  constructor(public auth: AuthServiceProvider) { }

  public authApproval(){
    this.auth.navigateForward('/login')
  }

  ngOnInit() {
  }

}
