import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewModel } from '../../models/review.model';
import { from, of, switchMap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  isPopup = false;
  isAddReviewBtn = true;
  rateNumber: number;

  reviewForm: FormGroup

  constructor(private _formBuilder: FormBuilder, private _reviewServies: ReviewsService) {
    this.rateNumber = 0;
    this.reviewForm = this._formBuilder.group({
      title: new FormControl("", [Validators.required]),
      content: new FormControl("", [Validators.required]),
      rating: new FormControl("", [Validators.required]),
    })



  }



  get title(): AbstractControl {
    return this.reviewForm.get('title');
  }

  get content(): AbstractControl {
    return this.reviewForm.get('content');
  }

  get rating(): AbstractControl {
    return this.reviewForm.get('rating');
  }

  get id(): AbstractControl {
    return this.reviewForm.get('rating');
  }

  ngOnInit(): void {
  }


  onAddReviewbtnClicked() {
    this.isPopup = true;
    this.isAddReviewBtn = false;

  }

  onCancelAddReview() {
    this.isPopup = false;
    this.isAddReviewBtn = true;
  }



  addReview() {

    if (this.reviewForm.valid) {

      const reviewModel = new ReviewModel();
      reviewModel.title = this.title.value;
      reviewModel.content = this.content.value;
      reviewModel.date = new Date().toDateString();
      reviewModel.rating = this.rating.value;
      console.log(reviewModel.rating);
      reviewModel.id = new Date().getTime()
      reviewModel.comments = [];
      this.onCancelAddReview();
      this._reviewServies.getRandomUser()
        .pipe(
          switchMap(user => {
            reviewModel.user = user;
            return of(reviewModel);
          }))
        .subscribe(reviewModel => {
          this._reviewServies.addReview(reviewModel);
        });
    }
  }





}
