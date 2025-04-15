import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { error, log } from 'console';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-question',
  standalone: false,
  
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit{

  questionid:any
  question:any;

  constructor(private _question:QuestionService,private _route:ActivatedRoute,private _router:Router){}

  ngOnInit(): void {
    
    // get the question first before updating

    this.questionid=this._route.snapshot.params['questionid'];
    
    this._question.getSingleQuestion(this.questionid).subscribe(
      (data)=>{
        this.question=data;
        console.log(this.question);
        
      },
      (error)=>{
        Swal.fire('Error !','question not loaded,somthing went wrong!','error');
        console.log(error);
        
      }
    )

  }

  formSubmit() {
    this._question.updateQuestion(this.question).subscribe(
      (data)=>{
        this.question=data;
        Swal.fire('Success !','Question updated successfully','success').then(
          (e)=>{
            this._router.navigate(['/admin/quizzes']); // redirecting 
          }
        );  
      },
      (error)=>{
        Swal.fire('Error !','question not updated,somthing went wrong!','error');
        console.log(error);
        
      }
    )
    }

}
