import { Component, Input } from '@angular/core';
import { getCategoriesResponse } from 'src/app/models/interfaces/categories/response/getCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {

  @Input() public categories: Array<getCategoriesResponse> = [];
  public categorySelected!: getCategoriesResponse

}
