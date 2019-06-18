import React , { Component } from 'react';
import { Container , Row , Col , Button ,Alert ,Spinner} from 'react-bootstrap';
import PageNotFound from '../PageNotFound';
import './style.css';
export default class OfferDetails extends Component{
    state = {
        userInfo :'',
        offerId:'',
        offer:''
    }
    componentDidMount(){
        const userInfo = {
            id: 1,
            fullName: 'Ayman AlQoqa',
            username: 'Ayman321396',
            avatar:
              'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
            };
            console.log('emptyState',this.state);
            console.log('userInfo',this.state);
    }
    render(){
        return(
            <>
            <div>alaaaa</div>
            </>
        )
    }



    
}