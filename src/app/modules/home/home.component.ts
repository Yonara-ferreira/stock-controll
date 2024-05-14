import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignupUserRequest } from 'src/app/models/interfaces/users/SingupUserRequest';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
loginCard = true;

loginForm = this.formBuilder.group({
  email: ['', Validators.required],
  password: ['',Validators.required],
});

signupForm = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  password: ['',Validators.required],
})

constructor(private formBuilder: FormBuilder, private service: UsersService){}

  onSubmitLoginForm(): void {

  }
  onSubmitSigUp(): void {
    if (this.signupForm.value && this.signupForm.valid){
      this.service
      .singupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
         next: (response) =>{
           if(response){
             alert('Usuario criado com sucesso');
           }
         },
         error: (err) => console.log(err),
      });
   }
  }

}
