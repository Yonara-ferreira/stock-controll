import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

sigupForm = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  password: ['',Validators.required],
})

constructor(private formBuilder: FormBuilder){}

  onSubmitLoginForm(): void {
    console.log('DADOS DO FORMULARIO',this.loginForm.value)
  }
  onSubmitSigUp(): void {
    console.log('DADOS DO FORMULARIO',this.sigupForm.value)
  }

}
