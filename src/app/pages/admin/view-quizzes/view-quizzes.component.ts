import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{


  quizzes=[
    {
      qId:10,
      title:'java basic',
      description:'this quiz of java basics ',
      maxMarks:'200',
      numberOfQuestions:'10',
      active:false,
      category:{
        title:'programming',
        description:'programming category'
      }
    },
    {
      qId:11,
      title:'Lagan',
      description:'this quiz of movies',
      maxMarks:'200',
      numberOfQuestions:'10',
      active:false,
      category:{
        title:'movie',
        description:'movie category'
      }
    }
  ]

  constructor(private _quiz:QuizService){}

  ngOnInit(): void {

    this._quiz.getAllQuizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !",'Somthing went wrong','error');
      }
    )
     
    
  }

  deleteQuiz(qId:any) {


    Swal.fire({

      icon:'warning',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,

    }).then(
      (result)=>{

         if(result.isConfirmed){

          // delete
          
          this._quiz.deleteQuiz(qId).subscribe(
            (data)=>{

               // after delete the quiz remove the delete quiz from the frontend
              this.quizzes= this.quizzes.filter((quiz)=>quiz.qId != qId); //  show all quiz except the quiz with quiz id we delete
              Swal.fire('success !','Quiz deleted successfully','success');
            },
            (error)=>{
              console.log(error);
              Swal.fire("Error !",'Error in deleting quiz','error');
            }
          )


         }

      }
    )


  }



}
