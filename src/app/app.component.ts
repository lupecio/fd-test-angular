import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  errors = {
    name: [],
    email: [],
    password: [],
    confirmPassword: [],
  };

  success = false;

  onCreateUser(postData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.errors = {
      name: [],
      email: [],
      password: [],
      confirmPassword: [],
    };

    this.http.post('http://localhost:8080/users', postData).subscribe({
      error: (e) => {
        e.error.errors.forEach((element) => {
          this.errors[element.fieldName].push({
            message: element.message,
          });
        });
      },
      complete: () => {
        this.success = true;
      },
    });
  }
}
