import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { title } from 'process';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts() {
        const res = await this.productService.getProducts();
        return res;
    }

    @Get(':id')
    getProductDetail(@Param('id') prodId:string) {
        return this.productService.getProductDetail(prodId);
    }

    @Post()
    async insertProduct(
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generateId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generateId }
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        await this.productService.deleteProduct(prodId);
        return null;
    }

}
