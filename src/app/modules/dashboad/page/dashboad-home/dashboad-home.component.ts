import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { ProdutsService } from 'src/app/services/produts/produts.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboad-home',
  templateUrl: './dashboad-home.component.html',
  styleUrls: [],
})
export class DashboadHomeComponent {
  public produtsList: Array<GetAllProdutsResponse> = [];

  constructor(
    private produtsService: ProdutsService,
    private message: MessageService,
    private productDtService: ProductsDataTransferService
  ) {}

  ngOninit(): void {
    this.getAllProdutsDatas();
  }

  getAllProdutsDatas(): void {
    this.produtsService.getAllProducts().subscribe({
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
}
