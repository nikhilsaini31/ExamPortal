import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any = {};  // Initialize with an empty object
  constructor(private loginservice:LoginService){}

  ngOnInit(): void{

     this.user = this.loginservice.getUser() || { firstname: 'Guest', lastname: '' };

    // this.loginservice.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     alert("something wrong !")
    //     console.log("user",this.user);
    //   }
    // )

  }

}
