import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/Enums/products/ProductsEvent';
import { deleteProductAction } from 'src/app/models/interfaces/products/events/deleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/events/EventAction';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProdutsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductAction = new EventEmitter<deleteProductAction>();


  public productSelected!: GetAllProdutsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProcuctEvent = ProductEvent.EDIT_PRODUCT_EVENT;


  handleProductEvent(action: string, id?: string): void {
    if(action && action !== ''){
      const productsEventData = id && id !== ''? {action, id} : { action };
      // EMITIR VALORES DO EVENTO
      this.productEvent.emit(productsEventData);
    }

  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if(product_id !== '' && productName !== ''){
      this.deleteProductAction.emit({
        product_id,
        productName
      })
    }

  }
}
