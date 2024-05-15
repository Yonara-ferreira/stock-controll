import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignupUserRequest } from 'src/app/models/interfaces/users/SingupUserRequest';
import { UsersService } from 'src/app/services/user/users.service';
import { SingupUserResponse } from '../../models/interfaces/users/SingupUserResponse';
import { authRequest } from 'src/app/models/interfaces/users/auth/authRequest';

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

constructor(private formBuilder: FormBuilder,
            private service: UsersService,
            private cookieService: CookieService
){}

  onSubmitLoginForm(): void {
    if(this.loginForm.value && this.loginForm.valid){
      this.service
      .authUser(this.loginForm.value as authRequest )
      .subscribe({
        next: (response) => {
          if(response){
              this.cookieService.set('USER_INFO', response.token);

              this.loginForm.reset();
          }
        },
        error: (err) => console.log(err),
      });
    }
  }

  onSubmitSigUp(): void {
    if (this.signupForm.value && this.signupForm.valid){
      this.service
      .singupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
         next: (response) => {
           if(response){
             alert('Usuario criado com sucesso');
             this.signupForm.reset();
             this.loginCard = true;
           }
         },
         error: (err) => console.log(err),
      });
   }
  }

}
