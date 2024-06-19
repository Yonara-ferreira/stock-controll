import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { SignupUserRequest } from 'src/app/models/interfaces/users/SingupUserRequest';
import { authRequest } from 'src/app/models/interfaces/users/auth/authRequest';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: UsersService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.service.authUser(this.loginForm.value as authRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity: 'success',
              summary: ' Sucesso!',
              detail: `Bem vindo de volta ${response?.name}`,
              life: 2000,
            });
            // Aguardar 1 segundos (1000 milissegundos) antes de redirecionar
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: ' falha na autenticação!',
            detail: `Usuario ${err?.name} não encontrado`,
            life: 2000,
          });
        },
      });
    }
  }

  onSubmitSigUp(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.service
        .singupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: ' Sucesso!',
                detail: `Usuario ${response?.name} criado com sucesso`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: ' falha na autenticação!',
              detail: `Erro ao criar um novo usuario`,
              life: 2000,
            });
          },
        });
    }
  }
}
