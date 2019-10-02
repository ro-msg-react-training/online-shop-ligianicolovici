import React,{Component} from 'react'
import PostData from './products.json'
import './App.css';

class Product extends Component{
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
                                {/* <h2>{'Product ID:'+ productt.id}</h2>
                                <h2>{'Product category:'+ productt.category}</h2>
                                <textarea>{'Product details:'+ productt.description}</textarea>
                                
                                */}
                                <a href='https://www.emag.ro/' ><img src={productt.image} alt='product'/></a>
                                <h2>{'Price: '+ productt.price + '$'}</h2>
                                
                            </div>
                            
                        
                    );
                })}
                 </div>
            </div>
        );
    }
}
export default Product


