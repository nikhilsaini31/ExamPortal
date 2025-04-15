import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { error, log } from 'console';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-quiz',
  standalone: false,
  
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})

export class LoadQuizComponent implements OnInit{

  cId:any;
  quizzes:any;
  activeQuizzes:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _snack:MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.cId=this._route.snapshot.params['catId'];
    // console.log(this.cId);
    
    // every time user click on category,category id will change so we have to get catid evry time from param that why we using this._route.params.subscribe( (params)
    this._route.params.subscribe(
      (params)=>{
        // console.log(params);
        this.cId=params['catId'];

        if(this.cId==0){

          this._quiz.getAllQuizzes().subscribe(
            (data)=>{
              this.quizzes=data;
              this.activeQuizzes=this.quizzes.filter((q:any)=>q.active === true);
              console.log(this.quizzes);
              
            },
            (error)=>{
              this._snack.open('Error in loading data from server !!','',{
                duration:3000,
              })
              console.log(error);
              
            }
          )
          
        }else{
          // console.log("specific quiz");
          
          this._quiz.getQuizOfCategory(this.cId).subscribe(
              (data)=>{

                this.quizzes=data;
                this.activeQuizzes=this.quizzes.filter((q:any)=>q.active === true);
            },
            (error)=>{
              this._snack.open('Error in loading data from server !!','',{
                duration:3000,
              })
              console.log(error);
            }
          )

        }
        
      }
    );

  
    
  }

}
