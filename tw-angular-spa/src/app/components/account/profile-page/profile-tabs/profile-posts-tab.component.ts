import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { ModelProfile } from '../../_models/ModelProfile';

@Component({
    selector: 'app-profile-posts-tab',
    template: `
        <div class="flexContainer">
            <div class="flexItem">
                <h4><u>Threads</u></h4>
                <ul>
                <li *ngFor="let thread of userProfileData?.threads"><b class="threadLink"
                    [routerLink]="['/thread', thread.id]">{{ thread.title }}</b>
                    ({{ thread.timeStamp | date: "mediumDate" }})</li>
                </ul>
            </div>
            <div class="flexItem">
                <h4><u>Comments</u></h4>
                <ul>
                <li *ngFor="let comment of userProfileData?.comments">
                    <b class="threadLink" [routerLink]="['/thread', comment.threadId]">[{{ comment.threadId }}]</b>&nbsp;
                    <i>"{{ comment.body }}"</i> ({{ comment.timeStamp | date: "mediumDate" }})</li>
                </ul>
            </div>
        </div>`,
    styles: [`
        .flexContainer {
            max-width: 1000px;
            display: flex;
            margin: 10px auto;
        }
        .flexItem {
            flex-grow: 1;
            justify-content: center;
            align-items: flex-start;
        }
        .threadLink:hover {
            cursor: pointer;
            color: rgb(119, 210, 235);
        }
        h4 {
            margin-top: 0px;
            margin-bottom: 5px;
        }
    `]
})

export class ProfilePostsTabComponent {
    @Input() userProfileData: ModelProfile;
}
