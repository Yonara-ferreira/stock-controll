import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) {}

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    console.log('Coockie deleted:', this.cookie.get('USER_INFO')); // Verificar se o cookie foi realmente deletado
    this.router.navigate(['/home']).then(() => {});
  }
}
