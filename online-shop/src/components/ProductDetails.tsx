import React from 'react'
import '../productModeling/product.css';
import { IProduct } from '../App';
import PostData from '../products.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBasket,faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

library.add(faShoppingBasket,faStepBackward)

export interface IProps {
    data?:IProduct;
    match?:any;
    appSetArray?:any;
}
interface IState{
    dataToExport:IProduct [];
    selectedProduct:IProduct;
}


const products: IProduct[] = Object.values(PostData);


export default class ProductDetails extends React.Component<IProps,IState>{ 
    constructor(props:IProps){
        super(props);
        this.state={
            selectedProduct: products[this.props.match.params.id],
            dataToExport:[]
        };
        console.log(this.state.dataToExport);
    }
    addToCart(product:IProduct){
        this.state.dataToExport.push(product);
        this.setState(()=>{
            return{
                dataToExport: this.state.dataToExport
            }
        })
        this.props.appSetArray(this.state.dataToExport);
    }
    render(){
        console.log(this.props.match.params.id);
        return(
            <div className = 'contentDetails'>
                <div className= 'productDetails'>
                    <br/>
                    <Link to ='/products'>
                    <a className="button is-primary is-outlined">
                        <span>Back to products</span>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon='step-backward'/>
                        </span>
                    </a>
                    </Link>
                    <a className="button is-danger is-outlined" onClick={()=>this.addToCart(this.state.selectedProduct)} >
                        <span >Add</span>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon='shopping-basket'/>
                        </span>
                    </a><br/>
                    <h1 className="subtitle is-2">{this.state.selectedProduct.name}</h1>
                    <p className='subtitle is-3'>{'~'+ this.state.selectedProduct.category + '~'}</p>
                    <img src={this.state.selectedProduct.image} alt='product' className="productPic"/>
                    <h2>{'Product ID:'+ this.state.selectedProduct.id}</h2>  
                    <div>
                        <text>{this.state.selectedProduct.description}</text>
                    </div><br/>
                    <span >{'Price: '+ this.state.selectedProduct.price+ '$'}</span>   
                    
                </div> 
                  
            </div>
            
        );
    }

}


