import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error, log } from 'node:console';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-before-quiz',
  standalone: false,
  
  templateUrl: './page-before-quiz.component.html',
  styleUrl: './page-before-quiz.component.css'
})
export class PageBeforeQuizComponent implements OnInit{


  quizId:any;
  quiz:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _sanck:MatSnackBar,
    private _router:Router
  ){}

  ngOnInit(): void {
    
    this.quizId=this._route.snapshot.params['qid'];
    // console.log(this.quizId);

    this._quiz.getSingleQuiz(this.quizId).subscribe(
      (data)=>{
        this.quiz=data;
        // console.log(this.quiz);
        
      },
      (error)=>{

        this._sanck.open('data not loaded,somthing went wrong !','',{
          duration:3000
        })
        console.log(error);
        
      }
    )

  }


  startQuiz() {
    
    Swal.fire({
      title: "Do you want to Start the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Strat",
      denyButtonText: `Cancel`,
      icon:'question'
    }).then((result) => {
      
      if (result.isConfirmed) {
        
        this._router.navigate(['/start/'+this.quizId]);

      } else if (result.isDenied) {

        Swal.fire("Error", "Somthing went wrong", "error");
      }
    });

  }

}
