import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { error } from 'console';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  quiz={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:false,
      category:{
        cId:''
      }
    }
    
  

  categories=[
    {
      cId:23,
      title:"programimg"
    },
    {
      cId:24,
      title:"movie"
    },
  ]


   
  // disabled: boolean = false;  // set to true if you want the toggle to be disabled

  constructor(private _quiz:QuizService,private _category:CategoryService,private _snak:MatSnackBar){}

  ngOnInit(): void {
    
    // first get category to show in dropdown
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{

        Swal.fire("Error !",'Error in loading categories form server','error');
        // console.log(error);
      }
    )

  }

  formSubmit() {
    
    if(this.quiz.title=='' || this.quiz.title==null){

      this._snak.open("Ttile Required !",'',{
        duration:2000,
      });
      return;

    }

    if(this.quiz.category.cId=='' || this.quiz.category==null){

      this._snak.open("category Required !",'',{
        duration:2000,
      });
      return;

    }


    this._quiz.addQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire("Success !!",'Quiz Added Successfully','success');

        this.quiz={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:false,
          category:{
            cId:''
          }
        }
        console.log("Quiz data",data);
      },
      (error)=>{

        Swal.fire("Error !",'Somthing Went Wrong','error');
        console.log(error);
      }
    )


  }



  
}
