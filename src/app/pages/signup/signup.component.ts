import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService:UserService,private snackbar:MatSnackBar){}

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  };

  formSubmit() {
    //alert("submit");
    console.log(this.user);

    if(this.user.username=='' || this.user.username==null){
      this.snackbar.open("Username is required !",'',{
        duration:3000,

      });
      return;
    } 

    // adduser method : from user Service
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        // success
        console.log(data);
      //  alert("success");
      // title , content , icon 
      Swal.fire('success !!','user is registered with id:'+ data.userId,'success');
      
      }, 
      (error)=>{
        console.log(error);
        // alert("Somthing went wrong");
        this.snackbar.open('Sonthing went wrong !!','',{
          duration:3000
        })
      }

    )

  } 


  

}
