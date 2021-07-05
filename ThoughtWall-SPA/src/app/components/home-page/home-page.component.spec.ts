import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { ModelThread } from './_models/ModelThread';
import { ThreadService } from './_services/thread.service';

describe('Component: HomePage', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [HttpClientTestingModule],
        });
    });

    it('should show at least 1 thread on homepage', fakeAsync(() => {
        const fixture = TestBed.createComponent(HomePageComponent);
        const app = fixture.debugElement.componentInstance;
        const threadService = fixture.debugElement.injector.get(ThreadService);

        const testThreads: Observable<ModelThread[]> =
            of([{ id: 1, username: 'pang', title: 'Qwerty', body: 'lorem ipsum', timestamp: new Date() }]);

        spyOn(threadService, 'getThreads').and.returnValue(testThreads);
        fixture.detectChanges();
        tick();
        expect(app.threads.length > 0).toBeTruthy();
    }));
});
