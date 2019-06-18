import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
// import CoverLetter from './CoverLetter';
import PageNotFound from '../PageNotFound/index';

// import statusColor from '../Helper/helper';

import './style.css';

export default class OfferDetails extends Component {
  state = {
    userInfo: '',
    offerId: '',
    offer: '',
    applications: '',
    myApplication: '',
    showWrongAlert: '',
  };

  componentDidMount() {
    // from localStorage
    const userInfo = {
      id: 1,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };

    console.log(this.props.userInfo);
    console.log('old state',this.state);
    
    this.setState({ userInfo }, () =>{

      console.log('new ', this.state);
    });
    console.log('proooooooops',this.props);
  
    // const {
    //   // eslint-disable-next-line react/prop-types
    //   params: { offerId },
    // } = this.props.match;
   const {offerId}= this.props.match.params;
   console.log('oooooooooooooooooooo',{offerId});
   console.log('state before offerId',this.state);
   
    this.setState({ offerId },()=>{
      console.log('state after offerId',this.state);
      
    });
    
    // fetch offerDetails by offer_id
    console.log(1111111111,offerId)
    fetch(`/api/v1/offer/${offerId}`, {
      method: 'GET',
    })
      .then(res =>res.json() )
      .then(res => {
        
        this.setState({ offer: res.data[0] })
        console.log('hhhhhhhh',this.state.offer);
        
      })
      .catch((err) =>
        {
          console.log(333333333333, err);
          this.setState(
          {
            showWrongAlert: false,
          },
          () =>
            setTimeout(() => {
              this.setState({ showWrongAlert: false });
            }, 5000)
        )}
      );

    // fetch applications by offerId and save it in state
    fetch(`/api/v1/offer-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ applications: res }))
      .catch(() =>
        this.setState(
          {
            showWrongAlert: false,
          },
          () =>
            setTimeout(() => {
              this.setState({ showWrongAlert: true });
            }, 5000)
        )
      );

    const { id } = userInfo;
    // fetch myApplication by userId and offerId
    fetch(`/api/v1/${id}/my-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(myApplication => {
        console.log('myyyyyy',myApplication);
        
        this.setState({ myApplication })})
      .catch(() =>
        this.setState(
          {
            showWrongAlert: true,
          },
          () =>
            setTimeout(() => {
              this.setState({ showWrongAlert: false });
            }, 5000)
        )
      );
  }

  handleEndContract = () => {
    // handle end contract login here....
  };

  render() {
    const {
      offer,
      offerId,
      applications,
      userInfo,
      myApplication,
      showWrongAlert,
    } = this.state;
    const { data } = applications;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        {console.log('ggggggggggggggggggggggggg')}
         {/* {console.log(offer.length)} */}
        {offer  ? (
        
          
          <Container className="page__container">
            {console.log('iddd',this.state.offer)}
            <Row>
              <Col>
                <span>
                {this.state.offer.position}
                  {console.log(this.state.offer.position)}
                </span>
                <p>{this.state.offer.title}</p>
              </Col>
              {console.log(offer.member_id)
              }
               {console.log(userInfo.id)
              }
              {offer.member_id === userInfo.id && (
                <>
                  {/* <span className={`status__${statusColor(offer[0].status)}`}> */}
                    {offer.status}
                  {/* </span> */}
                  {console.log(offer.status)}
                  
                  {offer && offer && offer.status === 'completed' ? (
                    <Button
                      className="offet-details__end-button"
                      variant="danger"
                      onClick={this.handleEndContract}
                    >
                      End Contract
                    </Button>
                  ) : null}
                </>
              )}
            </Row>
             {/* {this.state.offer.id} */}
             {console.log(offer.description)}
        <Row>
          <Col>
                    <Row>
                      <p>{offer.description}</p>
                    
                      <Col>
                        <div>
                        <SideCard title="skills" items={offer.skills} />
         <SideCard title="offer type" items={offer.offer_types} />
                        </div>
                      </Col>
                    </Row>
          </Col>
        </Row>
        <Row>
          {console.log(offer.member_id)}
          {console.log(userInfo.id)}
          {offer.member_id === userInfo.id ? (

            <>
              <Row>
                Application
              </Row>

            </>
          ):null}
          
        </Row>
         
          </Container>
        ) : (
          <PageNotFound />
        )}
      </>
    );
  }
}
