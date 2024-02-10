import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  constructor(private producService: ProductService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.producService.getProducts()
    .subscribe(
      res => this.products = res,
      err => console.log('error al cargar productos',err)
    )
  }

  deleteProduct(id: string){
    this.producService.deleteProducts(id).subscribe(res => this.getProducts(),
    err => console.log(err))
  }

}
