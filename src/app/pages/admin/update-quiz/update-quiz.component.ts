import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-quiz',
  standalone: false,
  
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  qId=0;
 
  // initialize the quiz
  quiz:any;
 // initialize the category
  categories:any;
  
  constructor(private _route:ActivatedRoute,private _router:Router,private _quiz:QuizService,private _category:CategoryService){}

  ngOnInit(): void {
                                  // this 'qid' came from path we set in 'app-routing-module.ts' file for updating quiz 
    this.qId=this._route.snapshot.params['qid']; // quiz id value
    
    // first get the quiz
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data)=>{
         this.quiz=data;
         console.log(this.quiz);

      },
      (data)=>{
        Swal.fire('Error !','Quiz data not loaded, somthing went worng !','error');
      }
    )
    // fetchiing categories
    this._category.categories().subscribe(
      (data)=>{
        this.categories=data;
      }
    )
    
  }

  updateData() {
    
     this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
           this.quiz=data;
          Swal.fire('success','Quiz updated Successfully','success').then(
            (e)=>{
               this._router.navigate(['/admin/quizzes']);
          });
      },
      (error)=>{
        Swal.fire('Error !','Quiz not update, somthing went worng !','error');
        console.log(error);
      }
     )

  }

}
