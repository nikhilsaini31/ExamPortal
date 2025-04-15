import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  // for admin , it will return all question
  public getQuestionOfQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`)
  }

  // for user , it will return only question == numberOfQuestion
  public getQuestionOfQuizUser(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`)
  }


  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  public getSingleQuestion(questionid:any){
    return this._http.get(`${baseUrl}/question/${questionid}`)
  }

  public deleteQuestion(quesid:any){
    return this._http.delete(`${baseUrl}/question/${quesid}`);
  }

  // eval quiz
  public evalQuiz(question:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,question);
  }
}
