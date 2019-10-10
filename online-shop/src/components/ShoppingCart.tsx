import React from 'react'
import '../productModeling/shoppingcart.css';
import { IProduct } from '../App.js';



interface IProps {
    data: IProduct[];
 
}
interface IState{
    cartProducts :IProduct[];
}


export class ShoppingCart extends React.Component<IProps,IState>{
    productsFromCart:any;
    constructor(props:IProps){
        super(props);
        this.state={
            cartProducts:this.props.data
        }
    
        
    }
    render() {
        if(this.state.cartProducts!=null){
              this.productsFromCart= this.state.cartProducts.map(
                (productt) =>   
                            <tr>
                                <td>{productt.name}</td>
                                <td>{productt.category}</td>
                                <td>{productt.price}</td>
                            </tr>         
            );        
        }else(
             this.productsFromCart=(
                <tr>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr>         
             )
        );
        
        return (
            <div className='content'>
                <h1 className="subtitle is-2">My shopping cart</h1>
                <div className='cart-list' >
                        <table className="table ">
                        <thead>
                            <tr>
                                <th>Name </th>
                                <th>Category </th>
                                <th>Price </th>
                                
                            </tr>
                        </thead>
                            <tbody>
                            {this.productsFromCart}
                            </tbody>
                            </table>
                       </div>
            </div>
        );
    }
}
export default ShoppingCart;