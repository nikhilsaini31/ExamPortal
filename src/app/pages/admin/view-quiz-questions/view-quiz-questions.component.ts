import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: false,
  
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {



  qId:any;
  title:any;
  questions:any=[];

  constructor(private _route:ActivatedRoute,private _question:QuestionService ){}

  ngOnInit(): void {
    
    this.qId=this._route.snapshot.params['qid']; // getting value form url 'qid' is name we set in routing file
    this.title=this._route.snapshot.params['title'];
      
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
           this.questions=data;
           console.log(this.questions);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !",'Questions not loaded,Somthing went wrong !','error');
      }
    )
  }

  deleteQuestion(questionID:any) {

      Swal.fire({
  
        icon:'warning',
        title:'Are you sure ?',
        confirmButtonText:'Delete',
        showCancelButton:true,
  
      }).then(
        (result)=>{
  
           if(result.isConfirmed){
  
            // delete
            
            this._question.deleteQuestion(questionID).subscribe(
              (data)=>{

                this.questions= this.questions.filter((q:any)=>q.quesID!=questionID);
                Swal.fire("success !",'Question deleted successfully ','success');
              },
              (error)=>{
                Swal.fire("Error !",'Question is not deleted,Somthing went wrong !','error');
              }
            )
           }
        }
      ) 
    }

}
