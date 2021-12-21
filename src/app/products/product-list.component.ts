import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css', ],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {

    static readonly PAGE_TITLE = 'Product List';

    readonly imageWidth = 50;
    readonly imageMargin = 2;

    private _productService!: ProductService;
    private _serviceSub!: Subscription;

    private _pageTitle: string;
    private _listFilter!: string;
    private _showImage!: boolean;

    private _errorMessage!: string;
    private _products: IProduct[];
    private _filteredProducts!: IProduct[];

    constructor(productService: ProductService) {
        this.productService = productService;
        this._pageTitle = ProductListComponent.PAGE_TITLE;
        this._products = [];
        this._showImage = false;
        this.listFilter = '';
    }

    private get productService(): ProductService {
        return this._productService;
    }

    private set productService(value: ProductService) {
        this._productService = value;
    }

    get listFilter(): string {
        return this._listFilter ? this._listFilter : '';
    }

    set listFilter(listFilter: string) {
        this._listFilter = listFilter;
        this.filteredProducts = this.performFilter();
    }

    get showImage(): boolean {
        return this._showImage ? this._showImage : false;
    }

    get filteredProducts(): IProduct[] {
        return this._filteredProducts ? this._filteredProducts : [];
    }

    set filteredProducts(filteredProducts: IProduct[]) {
        this._filteredProducts = filteredProducts;
    }

    get pageTitle(): string {
        return this._pageTitle;
    }

    set pageTitle(value: string) {
        this._pageTitle = value;
    }

    setPageTitle(message: string): void {
        this.pageTitle = `${ProductListComponent.PAGE_TITLE}${message ? `: ${message}` : ''}`;
    }

    toggleImage(): void {
        this._showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('Initilizing ProductListComponent');
        this._serviceSub = this.productService.getProducts().subscribe({
            next: products => this._filteredProducts = Object.assign(this._products, products),
            error: err => this._errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this._serviceSub.unsubscribe();
    }

    performFilter(): IProduct[] {
        const filterBy = this.listFilter.toLowerCase().trim();

        return this._products.filter(
            (product: IProduct) => (
                typeof product.productName === 'string'
                && 
                product.productName.toLowerCase().includes(filterBy)
            )
        );
    }

    onRatingClicked(message: string): void {
        this.setPageTitle(message);
    }
}