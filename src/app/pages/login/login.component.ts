import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("Login Component Initialized");
  }

  constructor(private snack:MatSnackBar,  private loginservice:LoginService , private router:Router){}

  loginData={
    username:'',
    password:'',
  }

  formSubmit(){
    console.log("login form submit");

    if(this.loginData.username.trim()=='' || this.loginData.username==null){

        this.snack.open('username is required !','',{
          duration:2000,
        });
        return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){

      this.snack.open('password is required !','',{
        duration:2000,
      });
      return;
    }

     this.loginservice.generateToken(this.loginData).subscribe(
       (data:any)=>{
        console.log('success'); // token generated
        console.log("data:",data);

        // login user , set token in localstorage
        this.loginservice.loginUser(data.token);

        // set role in localstorage
        this.loginservice.setUSerRole(data.role);

        this.loginservice.getCurrentUser().subscribe(
          (user:any)=>{

            // set user
            this.loginservice.setUser(user);
            console.log("user:",user);

            const role= this.loginservice.getUSerRole();
            console.log("role:",role);
            
            if (role == "ADMIN") {
              
               // redirect If admin : admin-dashboard
                window.location.href='/admin';
              //  this.router.navigate(['admin'])

            }else if(role == "NORMAL"){

              // redirect if noraml: noraml-dashboard
              
               window.location.href='/user-dashboard/0';
              // this.router.navigate(['user-dashboard'])

            }else{
               this.loginservice.logout();
               console.log("user role not found!")
            }

            
          }
        );

       },
       (error)=>{
          console.log('Error !');
          console.log(error);
          this.snack.open("Invalid Details !! Try Again",'',{
            duration:3000,
          })
       }
     );


  
  }
  

 }
