import { Component } from "@angular/core";
import { Route, Routes } from "@angular/router";
import { DashboadHomeComponent } from "./page/dashboad-home/dashboad-home.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboadHomeComponent,
  },
];

