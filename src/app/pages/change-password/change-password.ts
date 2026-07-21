import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, Form, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Component({
  selector: 'app-change-password',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(""),
    newPassword: new FormControl(""),
    confirmPassword: new FormControl("")
  });

  http = inject(HttpClient);
  onChangePassword(){
    const formValue = this.changePasswordForm.value;

    const obj = {

       userId: Number(localStorage.getItem("userId")),

       currentPassword: formValue.currentPassword,

      newPassword: formValue.newPassword,

      confirmPassword: formValue.confirmPassword
    };
     this.http.post("http://localhost:5282/api/User/ChangePassword", obj).subscribe({
      next: (result: any) =>{
        console.log(result);
         if (result.success == true) {

          alert(result.message);

          this.changePasswordForm.reset();

        }
        else {

          alert(result.message);

        }
      },
      error: (error) => {

        console.log(error);

        alert("Something went wrong.");

      }
     })

  }
}
