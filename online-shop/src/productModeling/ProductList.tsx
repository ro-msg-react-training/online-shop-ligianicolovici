import React from 'react'
import './productList.css';
import { IProduct } from '../App.js';

interface IProps {
    data: IProduct[];
}

export class ProductList extends React.Component<IProps>{
    render() {
        return (
            <div className='content'>
                <h1 className="title">Online Shop</h1>
                <div className='products'>
                    {this.props.data.map((productt) => {
                        return (

                            <div className='product'>
                                <h1 className="title">{productt.name}</h1>
                                <p>{'--' + productt.category + '--'}</p>
                                <a href='https://www.emag.ro/' ><img src={productt.image} alt='product' /></a><br></br>
                                <span>{'Price: ' + productt.price + '$'}</span>

                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default ProductList;