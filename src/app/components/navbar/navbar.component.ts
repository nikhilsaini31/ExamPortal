import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn = false;
  username = null;

  constructor(public loginservice:LoginService){}

  ngOnInit():void{
    this.isLoggedIn=this.loginservice.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.loginservice.getUser();
      this.username = user ? user.username : null;
    }
  }

  public logout(){
    this.loginservice.logout();
    this.isLoggedIn = false;
    this.username = null;
    window.location.reload();
  }

}
