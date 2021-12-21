import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private static readonly PAGE_TITLE = 'Product Details';

  private _pageTitle: string;

  product: IProduct | undefined;
  errorMessage!: string;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService) {
    this._pageTitle = ProductDetailComponent.PAGE_TITLE;
  }

  get pageTitle(): string {
    return this._pageTitle;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
