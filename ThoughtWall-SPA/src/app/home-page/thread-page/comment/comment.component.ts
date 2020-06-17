import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/_services/thread/comment.service';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/_services/account/account.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments = [];
  commentForm: FormGroup;
  errorMsg: string;

  constructor(private store: Store<{changeThread: {}}>,private commentService: CommentService, private accountService: AccountService) { }

  ngOnInit() {
    this.commentForm = this.commentService.createForm();
    this.store.select('changeThread').subscribe(data => {
      this.commentForm.get('threadId').patchValue(data);
    });
  }

  postComment() {
    if (this.commentForm.get('body').value.length < 255 && this.commentForm.get('body').value.length > 3) {
      this.commentService.postComment(this.commentForm.value).subscribe(
        () => {
          this.commentForm.reset();
        },
        err => this.errorMsg = err.error.errors.Body[0]
      );
    }
  }


  loggedIn() {
    return this.accountService.isLoggedIn();
  }
}
