import React,{Component} from 'react'
import PostData from './products.json'
import './App.css';

let testProduct={
    "id": 1,
    "name": "Notebook Basic 17",
    "category": "Laptops",
    "image": "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
    "price": 1249,
    "description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
}

export class ProductList extends Component{
    render(){
        return(
            <div className = 'content'>
                <h1>Online Shop</h1>
                <div className= 'products'>
                {Object.values(PostData).map((productt)=>{
                    return(
                       
                            <div className='product'>
                                <h1>{productt.name}</h1>
                                <p>{'--'+ productt.category+ '--'}</p>
                                <a href='https://www.emag.ro/' ><img src={productt.image} alt='product'/></a><br></br>
                                <span>{'Price: '+ productt.price + '$'}</span>
                                
                            </div>
                            
                        
                    );
                })}
                 </div>
            </div>
        );
    }
}
export default ProductList;

export interface Product{
    id:number;
    name:string;
    category:string;
    image:string;
    price:number;
    description:string;
}

export class ProductDetails extends Component{

    render(){
        return(
            <div className = 'content'>
                <h1>Online Shop</h1>
                <div className= 'productDetails'>
                    <h1>{testProduct.name}</h1>
                    <a href='https://www.emag.ro/' ><img src={testProduct.image} alt='product'/></a>
                        <p>{'--'+testProduct.category+ '--'}</p>
                            <h2>{'Product ID:'+ testProduct.id}</h2>
                            <div>
                                <text>{testProduct.description}
                                </text>
                            </div><br/>
                        <span>{'Price: '+ testProduct.price + '$'}</span>      
                </div>    
            </div>
        );
    }

}



