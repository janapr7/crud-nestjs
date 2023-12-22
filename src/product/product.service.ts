import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({title, desc, price});
        const res = await newProduct.save();
        return res.id as string;
    }

    async getProducts() {
        const res = await this.productModel.find().exec();
        return res.map((item) => ({id: item.id, title: item.title, desc: item.desc, price: item.price}));
    }

    async getProductDetail(productId: string) {
        const product = await this.findProduct(productId);
        return {id: product.id, title: product.title, desc:product.desc, price:product.price};
    }

    async updateProduct(productId: string, title:string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId)
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.desc = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        await this.productModel.deleteOne({_id: productId}).exec();
    }

    private async findProduct(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if(!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}
