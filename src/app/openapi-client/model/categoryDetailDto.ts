/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProductShowDto } from './productShowDto';


export interface CategoryDetailDto { 
    id: number;
    active: boolean;
    name: string;
    products: Array<ProductShowDto>;
}

