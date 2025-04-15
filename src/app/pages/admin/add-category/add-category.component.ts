import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-add-category',
  standalone: false,
  
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{


  category={
      title:'',
      description:'',
  }

  constructor(private _category:CategoryService , private _snak:MatSnackBar){}

  ngOnInit(): void {

  }

 formSubmit(){

  if(this.category.title.trim()=='' || this.category.title==null){

    this._snak.open("Ttile Required !",'',{
      duration:2000,
    });
    return;
  }
  
  // if all done

  this._category.addCategory(this.category).subscribe(

    (data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire("Success !!",'Category Added Successfully','success');
      console.log("category data",data);
    },
    (error)=>{
      console.log('error',error);
      Swal.fire("Error !!",'Something Wrong','error');

    }

  )

 }

}
