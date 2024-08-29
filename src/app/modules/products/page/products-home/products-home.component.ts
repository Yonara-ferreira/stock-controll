import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/events/EventAction';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { ProdutsService } from 'src/app/services/produts/produts.service';
import { ProductsDataTransferService } from '../../../../shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>(); // $ para informar que é um observable

  public productsDatas: Array<GetAllProdutsResponse> = [];

  constructor(
    private productService: ProdutsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.productsDatas = productsLoaded; // para dados em memoria
    } else {
      this.getAPIProductsDatas(); // buscar na api
    }

    console.log('DADOS DOS PRODUTOS EM ESTOQUE', this.productsDatas);
  }

  getAPIProductsDatas() {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
            console.log('DADOS DOS PRODUTOS EM ESTOQUE', this.productsDatas);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Errp',
            detail: 'Erro ao buscar os produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      console.log('DADOS DO EVENTO RECEBIDO', event);
    }
  }

  handleDeleteProductAction(event: {
    product_id: string;
    productName: string;
  }): void {
    if(event){
      console.log('DADOS DO EVENTO DELETADO', event)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next;
    this.destroy$.complete;
  }
}
