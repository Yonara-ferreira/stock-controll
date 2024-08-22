import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  public productsDataEmitter$ =
    new BehaviorSubject<Array<GetAllProdutsResponse> | null>(null);

  public productsDatas: Array<GetAllProdutsResponse> = [];

  setProductsDatas(products: Array<GetAllProdutsResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1), // operador desescreve do observable... acaba com problema de memory leky
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        },
      });
    return this.productsDatas;
  }
}
