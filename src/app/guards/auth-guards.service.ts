import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/user/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsService {
  constructor(private userService: UsersService, private router: Router) {}

  // verifica se o usuario tem permissao, e redireciona para as necessarias
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLoggeIn()) {
      this.router.navigate(['/home']);
      return false;
    }

    this.userService.isLoggeIn();
    return true;
  }
}
