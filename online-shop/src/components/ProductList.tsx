import React from 'react'
import '../productModeling/productList.css';
import { IProduct } from '../App.js';
import { Link} from 'react-router-dom';


interface IProps {
    data: IProduct[];
}

export class ProductList extends React.Component<IProps>{
    render() {
        let products= this.props.data.map(
            (productt) => 
                <Link to= {`/products/${productt.id}`}>     
                    <div className='product' >
                        <h1 className="subtitle is-2">{productt.name}</h1>
                        <p className='subtitle is-3'>{'~' + productt.category + '~'}</p>
                        <img src={productt.image} alt='product' /><br></br>
                        <span className='price-tag'>{'Price: ' + productt.price + '$'}</span>
                    </div>
                </Link> 
        );        
        return (
            <React.Fragment>
                <div className='content'>
                    <div className='products'>
                        {products}
                    </div>
                </div>
            </React.Fragment>
          
        );
    }
}
export default ProductList;