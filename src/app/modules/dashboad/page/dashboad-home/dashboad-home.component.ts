import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { ProdutsService } from 'src/app/services/produts/produts.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboad-home',
  templateUrl: './dashboad-home.component.html',
  styleUrls: [],
})
export class DashboadHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public produtsList: Array<GetAllProdutsResponse> = [];

  constructor(
    private produtsService: ProdutsService,
    private message: MessageService,
    private productDtService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProdutsDatas();
  }

  getProdutsDatas(): void {
    this.produtsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.produtsList = response;
            this.productDtService.setProductsDatas(this.produtsList);
            console.log('DADOS PRODUTOS', this.produtsList);
          }
        },
        error: (err) => {
          console.log(err);
          this.message.add({
            severity: 'Error',
            summary: 'Erro',
            detail: 'erro ao buscar produtos!',
            life: 2500,
          });
        },
      });
  }

  // emite um novo valor,
  // fazendo assim a limpeza de serviço
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
