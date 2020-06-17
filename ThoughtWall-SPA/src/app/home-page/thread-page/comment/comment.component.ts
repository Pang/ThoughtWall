import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/_services/thread/comment.service';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/_services/account/account.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments = [];
  commentForm: FormGroup;
  errorMsg: string;

  constructor(private commentService: CommentService, private accountService: AccountService) { }

  ngOnInit() {
    // TODO put threadID in state
    // this.comment.threadId = this.route.snapshot.paramMap.get('id');
    this.commentForm = this.commentService.createForm();
  }

  postComment() {
    if (this.commentForm.get('comment').value.length < 255 && this.commentForm.get('comment').value.length > 3) {
      this.commentService.postComment(this.commentForm).subscribe(
        res => this.commentForm.reset(),
        err => this.errorMsg = err.error.errors.Body[0]
      );
    }
  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
