import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from 'src/app/models/Enums/products/ProductsEvent';
import { getCategoriesResponse } from 'src/app/models/interfaces/categories/response/getCategoriesResponse';
import { EventAction } from 'src/app/models/interfaces/products/events/EventAction';
import { CreateProductRequest } from 'src/app/models/interfaces/products/requests/CreateProductRequest';
import { EditProductRequest } from 'src/app/models/interfaces/products/requests/EditProductRequest';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProdutsService } from 'src/app/services/produts/produts.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: [],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categoriesData: Array<getCategoriesResponse> = [];
  public selectedCategories: Array<{ name: string; code: string }> = [];
  public productAction!: {
    event: EventAction,
    productData: Array<GetAllProdutsResponse>
  };

  public selectedProductDatas!: GetAllProdutsResponse;
  public productsDatas: Array<GetAllProdutsResponse> = [];


  // Formulario para criaçao de um novo produto,
  // passando um novo produto com campos obrigatorios
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: ['', Validators.required],
  });

  // Formulario para ediçao de um  produto,
  // passando um novo produto com campos obrigatorios
  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
  });

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProdutsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private ref: DynamicDialogConfig,
    private productDtService: ProductsDataTransferService

  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;
    this.getAllCategories();

    if(this.productAction?.event?.action === this.editProductAction && this.productAction?.productData){
      this.getProductSelectedDatas(this.productAction?.event?.id as string);
    }

    this.productAction?.event?.action === this.saleProductAction
      this.getProdutDatas();

  }

  getAllCategories() {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesData = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount),
      };

      this.productService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: ' Sucesso',
              detail: `Produto ${response?.name} Criado com Sucesso!`,
              life: 2500,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: ' Erro',
              detail: `Problemas para criar o produto`,
              life: 2000,
            });
          },
        });
    }

    this.addProductForm.reset();
  }

  handleSubmitEditProduct(): void {
    if (this.editProductForm.value && this.editProductForm.valid){
      const editProduct: EditProductRequest = {
        name: this.editProductForm.value.name as string,
        price: this.editProductForm.value.price as string,
        description: this.editProductForm.value.description as string,
        product_id: this.productAction?.event?.id || '',
        amount: Number(this.editProductForm.value.amount),
      };

      this.productService
      .editProduct(editProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Produto editado com sucesso!`,
            life: 2500,
          });
          this.editProductForm.reset();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Por favor, verifique o formulário',
            life: 2500
          });
          this.editProductForm.reset();
        },
      });
    }

  }

  getProductSelectedDatas(productId: string): void {
    const allProducts = this.productAction?.productData;

    if(allProducts.length > 0){
      const productFilter = allProducts.filter(
        (element) => element?.id === productId
      );

      if(productFilter){
        this.selectedProductDatas = productFilter[0];
        this.editProductForm.setValue({
          name: this.selectedProductDatas?.name,
          price: this.selectedProductDatas?.price,
          amount: this.selectedProductDatas?.amount.toString(),
          description: this.selectedProductDatas?.description,
        });
      }
    }
  }

  getProdutDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response) => {
        if(response.length > 0 ){
          this.productsDatas = response;
          this.productsDatas &&
            this.productDtService.setProductsDatas(this.productsDatas)
        }
      }
    })
  }




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
