import { Location, LocationStrategy, PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { clear, error, log } from 'console';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  standalone: false,

  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css',
})
export class StartQUizComponent implements OnInit {
  qId: any;
  questions: any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;

  constructor(
    private _locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qid'];

    // load question
    this._question.getQuestionOfQuizUser(this.qId).subscribe(
      (data) => {
        this.questions = data;
        // each question for 2 min
        this.timer = this.questions.length * 2 * 60; // converting in seconds

        // this.questions.forEach((q: any) => {
        //   // adding new variable in question object
        //   q['givenAnswer'] = '';
        // });

        // console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        Swal.fire('Error !', 'Error in loading Quiestion of Quiz', 'error');
        console.log(error);
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this._locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  // submit quiz function
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showResult();

       
      }
    });
  }

  // show result
  showResult() {
    this.isSubmit = true;

    // calculation server side
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        // console.log(data);
        this.marksGot= parseFloat(Number(data.marksGot).toFixed(2)); // showing only two digits afetr decimal
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
      },
      (error) => {
        Swal.fire('Error !', 'somthing went wrong !', 'error');
        console.log(error);
      }
    )

    //calculation(client side) if we are not duing in server side
      // this.questions.forEach((q: any) => {
      //   if (q.givenAnswer == q.answer) {
      //     this.correctAnswer++;
      //     // get single question marks
      //     let singleQuestionMarks =
      //       this.questions[0].quiz.maxMarks / this.questions.length;
      //     // add single question marks in got marks
      //     this.marksGot += singleQuestionMarks;
      //   }

      //   if (q.givenAnswer.trim() != '') {
      //     this.attempted++;
      //   }
      // });

    // console.log('correct anser', this.correctAnswer);
    // console.log('Marks got', this.marksGot);
    // console.log('Attempted', this.attempted);
  }

  printPage(){
    window.print();
  }

  // timer function
  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        // submit the quiz
        this.showResult();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000); // if function will run in every 1000 milisec (1 sec)
  }

  // format time
  getFormatTime() {
    let mm = Math.floor(this.timer / 60); // it will return and 'floor' remove sec like 4.50 into 4
    let sec = this.timer - mm * 60;
    return `${mm} min: ${sec} sec`;
  }
}
