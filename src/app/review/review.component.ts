import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewsService } from './../services/reviews.service';
import { ReviewModel } from './../models/review.model';
import { CommentModel } from './../models/comment.model';
import { FormControl, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})



export class ReviewComponent implements OnInit {

  addCommentBtn = true;
  mainAddCommentBtn = false;
  addCommentTextarea = false;
  realComment = false;
  isRateLike = true;
  isRatedislike = true;
  rateNumber: number;


  reviews: ReviewModel[] = [];
  commentFormControl: FormControl;

  constructor(private _ReviewsService: ReviewsService) {

    this.rateNumber = 0;
    this.commentFormControl = new FormControl('', [Validators.required]);
  }

  ngOnInit() {



      this.reviews = this._ReviewsService.getReviews();
      this._ReviewsService.reviewsSubject.subscribe(reviews => this.reviews = reviews);


  }

  viewTextarea = () => {

    this.mainAddCommentBtn = true;
    this.addCommentTextarea = true;
    this.realComment = false;
    this.addCommentBtn = false;
  }

  onAddComment = () => {
    this.realComment = true;
    this.addCommentBtn = false;
    this.mainAddCommentBtn = false;
    this.addCommentTextarea = false;
  }

  addComment = (reviewId: number) => {
    console.log('review id',reviewId);

    const commentModel = new CommentModel();
    commentModel.id = new Date().getTime();
    commentModel.message = this.commentFormControl.value;

    this._ReviewsService.getRandomUser()
      .pipe(
        switchMap(user => {
          commentModel.user = user;
          return of(commentModel);
        }))
      .subscribe(commentModel => {
        this._ReviewsService.addComment(commentModel, reviewId);

        this.onAddComment();
      });
  }

}
