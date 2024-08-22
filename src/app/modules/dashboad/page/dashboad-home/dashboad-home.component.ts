import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
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

  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

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
            this.setProductsChartConfig();
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

  setProductsChartConfig(): void {
    if (this.produtsList.length > 0) {
      const documentsStyles = getComputedStyle(document.documentElement);
      const textColor = documentsStyles.getPropertyValue('--text--color');
      const textColorSecondary = documentsStyles.getPropertyValue(
        '--text-color-secondary'
      );

      const surfaceBorder =
        documentsStyles.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.produtsList.map((element) => element?.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentsStyles.getPropertyValue('--indigo-400'),
            borderColor: documentsStyles.getPropertyValue('--indigo-400'),
            hoverBackgroundColor:
              documentsStyles.getPropertyValue('--indigo-500'),
            data: this.produtsList.map((element) => element?.amount),
          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }
  // emite um novo valor,
  // fazendo assim a limpeza de serviço
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
