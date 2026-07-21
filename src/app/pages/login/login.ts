import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';//tells angular that this class is component
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  })

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    // debugger;
    const formValue = this.loginForm.value;
    this.http.post("http://localhost:5282/api/User/GetUserDetails", formValue).subscribe({
      next: (result: any) => {

        console.log("Complete Result:", result);

        if (result.success == true) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userId',result.data.userId);
            localStorage.setItem('userName',result.data.userName);
          // console.log("Login Success");  
          this.router.navigate(['/dashboard']);
        } else {
          console.log("Login Failed");
          alert(result.message);
        }
      },
      error: (error) => {
        console.log(error);
        console.log(error.status);
        console.log(error.message);
        console.log(error.error);
        // debugger;
      }
    })
  }
}
