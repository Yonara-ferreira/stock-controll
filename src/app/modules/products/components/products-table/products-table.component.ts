import { Component, Input } from '@angular/core';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProdutsResponse> = [];

  public productSelected!: GetAllProdutsResponse;

  handleProductEvent() {

  }

  handleDeleteProduct(){

  }
}
