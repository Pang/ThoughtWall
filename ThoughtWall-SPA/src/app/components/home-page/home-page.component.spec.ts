import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { ModelThread } from './_models/ModelThread';
import { ThreadService } from './_services/thread.service';

describe('Component: HomePage', () => {
    let fixture: ComponentFixture<HomePageComponent>;
    let app: any;
    let threadService: ThreadService;
    const testThreads: Observable<ModelThread[]> =
        of([{ id: 1, username: 'pang', title: 'Qwerty', body: 'lorem ipsum', timestamp: new Date() }]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [HttpClientTestingModule],
        });
        fixture = TestBed.createComponent(HomePageComponent);
        app = fixture.debugElement.componentInstance;
        threadService = fixture.debugElement.injector.get(ThreadService);
    });

    it('should show at least 1 thread on homepage', fakeAsync(() => {
        spyOn(threadService, 'getThreads').and.returnValue(testThreads);
        fixture.detectChanges();
        tick();
        expect(app.threads.length > 0).toBeTruthy();
    }));
});
