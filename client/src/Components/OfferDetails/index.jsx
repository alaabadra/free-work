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
      id: 2,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };
    // console.log('before userInfo in state ', this.state);
    this.setState({ userInfo }, () => {

      // console.log('after userInfo in state ', this.state);
    });
    // console.log('proooooooops',this.props);
    const { offerId } = this.props.match.params;
    //  console.log('state before offerId',this.state);

    this.setState({ offerId }, () => {
      // console.log('state after offerId',this.state);

    });

    fetch(`/api/v1/offer/${offerId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {

        this.setState({ offer: res.data[0] })
        console.log('fetch offer', this.state.offer);
      })
      .catch((err) => {
        console.log('errCatch offer', err);
      }
      );

    // fetch applications by offerId and save it in state
    fetch(`/api/v1/offer-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ applications: res.data }, () => {
        console.log(' fetch offer app', this.state.applications);

      }))
      .catch((err) => console.log('err catch app', err))

    const { id } = userInfo;
    // // fetch myApplication by userId and offerId
    fetch(`/api/v1/${id}/my-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ myApplication: res.data[0] }, () => {
          console.log('fetch my applications', this.state.myApplication);

        })
      })
      .catch(err => console.log('err Catch my app', err))
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
    console.log('applections',applications)
    return (

      <>
        {console.log('offer in render', offer)}
        {offer ? (
          <Container className="page__container">
            <Row>
              <Col>
                <span>
                  {this.state.offer.position}
                </span>
                <p>{this.state.offer.title}</p>
              </Col>
              {console.log('member_id in offer', offer.member_id)
              }
              {console.log('id in userInfo', userInfo.id)
              }
              {offer.member_id === userInfo.id && (
                <>
                  {offer.status}
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
              {offer.member_id === userInfo.id ? (
                <>
                  <Row>
                    Application
              </Row>
                  <Col>
                    {applications &&
                  applications.map(item => {
                        // console.log(' offer app in render', this.state.applications);
                        return (
                          <>
                            <ApplicationCard
                              viewProfile
                              hireMe={offer.status !== 'finished'}
                              defaultavatar={userInfo.avatar}
                              key={Math.random()}
                              application={item}
                            />
                            {/* <div>othman</div> */}
                            {/* <div>{item.toString()}</div> */}
                            {/* <div>{applications.username}</div> */}
                            {console.log('oooooooooooffffferr apppp', item)
                            }

                          </>
                        )
                      })
                    }
                  </Col>

                  {/* no app */}
                  {
                    !applications ||
                    (!applications.data && (
                      <>
                        {console.log('not app', applications)}

                        <span>there  is no app</span>
                      </>
                    ))
                  }
                  {/* {console.log(' apppppp', applications.username)}
                  {console.log(' appppppbbbbbbbbbbb', this.state.applications)} */}

                  {console.log('my apppppp', myApplication)}
                  {/* <div>{applications}</div> */}
                  {/* <div>hgj {myApplication.pr}</div> */}
                  {/* <div>{applications.avatar}</div>
                  <div>{applications.proposal}</div> */}
                </>
              ) : (
                  <>


                    {myApplication &&
                      (

                        <>
                          {/* <div>{my}</div> */}
                          <p>{myApplication.username}</p>
                          <p>{myApplication.avatar}</p>


                        </>

                        // <>
                        // <ApplicationCard 
                        // key={Math.random()}
                        // application={myApplication.data[0]}
                        // />
                        // </>
                      )
                    }
                  </>
                )}

            </Row>
          </Container>
        ) : (
            <PageNotFound />
          )}
      </>
    );
  }
}
