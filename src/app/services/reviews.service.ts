import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ReviewModel } from './../models/review.model';
import { CommentModel } from './../models/comment.model';

export const REVIEWS_KEY = 'REVIEWS_KEY';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviews: ReviewModel[];
  reviewsSubject: Subject<ReviewModel[]> = new Subject<ReviewModel[]>();

  constructor(private _http: HttpClient) {
    const localStorageReviews = localStorage.getItem(REVIEWS_KEY);
    this.reviews = localStorageReviews ? JSON.parse(localStorageReviews) : [];
  }

  addReview(review: ReviewModel) {
    this.reviews = [review, ...this.reviews];
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(this.reviews));
    this.reviewsSubject.next(this.reviews);
  }

  addComment(comment: CommentModel, reviewId: number) {
    const reviewIndex = this.reviews.findIndex(reviewItem => reviewItem.id === reviewId);
    this.reviews[reviewIndex].comments = [comment, ...this.reviews[reviewIndex].comments];
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(this.reviews));
    this.reviewsSubject.next(this.reviews);
  }


  getReviews =() =>  {
    return this.reviews;
  }

  

  getRandomUser(): Observable<UserModel> {
    return new Observable((observer) => {
      this._http.get('https://randomuser.me/api')
        .subscribe((users: any) => {
          observer.next(users && users.results && users.results.length ? users.results[0] : null);
        })
    });
  }



}
