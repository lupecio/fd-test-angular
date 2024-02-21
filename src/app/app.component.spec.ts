import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCreateUser() method on form submit', () => {
    const compiled = fixture.debugElement.nativeElement;
    const getForm = fixture.debugElement.query(By.css('#postForm'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
    expect(component.success).toBe(false);
  });

  it('should show errors', fakeAsync(() => {
    component.onCreateUser({
      name: 'teste',
      email: 'teste@email.com',
      password: '123456',
      confirmPassword: '123456',
    });

    const req = httpMock.expectOne((req: HttpRequest<any>) => {
      expect(req.url).toBe('http://localhost:8080/users');
      expect(req.method).toBe('POST');

      return true;
    });

    req.flush({});
  }));
});
