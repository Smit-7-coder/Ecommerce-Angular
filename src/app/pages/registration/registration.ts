import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-registration',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  registrationFrom: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    confirmpassword: new FormControl("")
  })
  http = inject(HttpClient);
  route = inject(Router);

  onRegister() {
    const formValue = this.registrationFrom.value;
    this.http.post("http://localhost:5282/api/User/Register", formValue).subscribe({
      next: (result: any) => {
        if (result.success == true) {
          this.route.navigate(['/login']);
        } else {
          alert(result.message);
        }
      },
      error: (error) => {
        console.log(error);
        console.log(error.status);
        console.log(error.message);
        console.log(error.error);
      }
    })
  }
}
