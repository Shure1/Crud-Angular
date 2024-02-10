import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  product:Product = {
    _id:'',
    name:'',
    deescription:'',
    price:0,
    imageURL:''
  }
  /* para saber si estoy creando o actualizando */
  edit:boolean = false

  constructor(private productService: ProductService,
    private router:Router,
    private activatedRoute: ActivatedRoute){

  }


  ngOnInit(): void {
    /* obtenemos el parametro del id para editar */
    const params = this.activatedRoute.snapshot.params
    if(params){
      this.productService.getProduct(params).subscribe(
        res => {
          console.log(res)
          this.product = res
          this.edit = true
        },
        err => console.log(err)
      )
    }
  }

  submitProduct(){
    this.productService.createProducts(this.product).subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/'])
      } ,
      err => console.log(err)
    )
  }

  updateProduct(){
    this.productService.updateProducts(this.product._id, this.product).subscribe(
      res => {
        console.log(res),
        this.router.navigate(['/'])
      },
      err => console.log(err)
    )
  }


}
