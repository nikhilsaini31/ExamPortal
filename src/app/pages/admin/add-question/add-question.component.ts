import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error, log } from 'node:console';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassicEditor } from 'ckeditor5';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add-question',
  standalone: false,

  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {

  public Editor: any;
  public isBrowser: boolean = false;

  title: any;

  question = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qId: null,
    },
  };

  constructor(
    private _question: QuestionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sank: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit(): Promise<void> {
    this.question.quiz.qId = this._route.snapshot.params['qid'];
    this.title = this._route.snapshot.params['title'];

    if (this.isBrowser) {
      const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic'))
        .default;
      this.Editor = ClassicEditor;
    }
  }

  formSubmit() {
    if (this.question.content == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1 == '' || this.question.option1 == null) {
      return;
    }

    if (this.question.option2 == '' || this.question.option2 == null) {
      return;
    }

    if (this.question.answer == '' || this.question.answer == null) {
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        this.question = data;
        Swal.fire('success !', 'Question added successfully', 'success');

        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';

        // console.log(this.question);
      },
      (error) => {
        Swal.fire(
          'Error !',
          'Question not added , somthing went wrong',
          'error'
        );
        console.log(error);
      }
    );
  }
}
