import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboadHomeComponent } from './page/dashboad-home/dashboad-home.component';



@NgModule({
  declarations: [
    DashboadHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboadModule { }
