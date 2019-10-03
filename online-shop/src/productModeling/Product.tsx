import React from 'react'
import './product.css';
import { IProduct } from '../App';

export interface IProps{
    data: IProduct
}


export default class ProductDetails extends React.Component<IProps>{

    render(){
        return(
            <div className = 'content'>
                <h1>Online Shop</h1>
                <div className= 'productDetails'>
                    <h1>{this.props.data.name}</h1>
                    <a href='https://www.emag.ro/' ><img src={this.props.data.image} alt='product'/></a>
                    <p>{'--'+this.props.data.category+ '--'}</p>
                    <h2>{'Product ID:'+ this.props.data.id}</h2>
                    <div>
                        <text>{this.props.data.description}</text>
                    </div><br/>
                    <span>{'Price: '+ this.props.data.price + '$'}</span>      
                </div>    
            </div>
        );
    }

}




