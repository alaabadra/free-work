/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Card, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import statusColor from '../../Helper/helper';

import './style.css';
import { Prev } from 'react-bootstrap/PageItem';

class ApplicationCard extends Component {
  
  state = {
    application: '',
    userInfo: '',
    showWrongAlert: false,
  };
  
  componentDidMount() {
    // from localStorage
    {console.log('componentdidmount applicationCard',this.props)}
    const userInfo = {
      id: 1,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
      'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };
    this.setState({ userInfo });
    const { application } = this.props;
    this.setState({ application });
  }
  
  handleProfile = () => {
    console.log(this.props);
    
    const {
      application: { username },
      // eslint-disable-next-line react/prop-types
      history,
    } = this.props;
    history.push(`/app/profile/${username}`);
  };

  handleHireMe = () => {
    // handle hire me button
    const { application, match, history } = this.props;
    const { member_id } = application;
    const {
      // eslint-disable-next-line react/prop-types
      params: { offerId },
    } = match;
    fetch('/api/v1/hired-member', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        member_id,
        offer_id: offerId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          console.log('ressss',res.data);  
          
          const { status } = res.data[0];
          this.setState(prevState => {
            console.log('prevvv',prevState);
            
            const newApplication = { ...prevState.application };
            newApplication.status = status;
            return { application: newApplication };
          });
        }
      })
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
  };

  handleAccept = () => {
    const { userInfo } = this.state;
    const { match } = this.props;
    const {
      params: { offerId },
    } = match;
    fetch(`/api/v1/hired-member/${userInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ offer_id: offerId, status: 'accepted' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const { history } = this.props;
          history.push(`app/offers/${offerId}`);
        } else {
          throw new Error();
        }
      })
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
  };

  handleRefuse = () => {
    const { userInfo } = this.state;
    const { match } = this.props;
    const {
      params: { offerId },
    } = match;
    fetch(`/api/v1/hired-member/${userInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ offer_id: offerId, status: 'refused' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const { history } = this.props;
          history.push(`app/offers/${offerId}`);
        } else {
          throw new Error();
        }
      })
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
  };

  render() {
    const {  match } = this.props;
    const { application, userInfo, showWrongAlert } = this.state;
    const { member_id } = application;
    const {id} = this.state.userInfo
    const {
        
        params: { offerId },
      } = match;
    const { defaultAvatar, viewProfile, hireMe } = this.props;
    console.log('render applicarionCard');
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        <div className="application-card__container">
          <Card style={{ borderColor: '#eaeaea' }}
          // onClick={() => history.push(`/api/v1/${id}/my-applications/${offerId}`)}
          >
            <Card.Header>
              <Card.Title>
                <Image
                  src={application.avatar ? application.avatar : defaultAvatar}
                  className="application-card__avatar"
                />
                <span style={{ paddingLeft: '10px' }}>
                  {application.full_name}
                </span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ color: 'rgba(51, 51, 51, 0.8)' }}>
                {application.proposal}
              </Card.Text>
              <div className="application-card__button__container">
                {viewProfile && (
                  <Button
                    className="application-card__button"
                    onClick={this.handleProfile}
                  >
                    {' '}
                    View Profile
                  </Button>
                )}
                {!application.status ? (
                  <>
                    {hireMe && (
                      <Button
                        className="application-card__button"
                        onClick={this.handleHireMe}
                      >
                        Hire Me
                      </Button>
                    )}
                  </>
                ) : (
                  <Card.Text
                    className={`status__${statusColor(application.status)}`}
                  >
                    {application.status}
                  </Card.Text>
                )}
                {userInfo.id === application.id &&
                  application.status &&
                  application.status === 'pending' && (
                    <>
                      <Button
                        className="application-card__button"
                        onClick={this.handleAccept}
                      >
                        Accept
                      </Button>
                      <Button
                        className="application-card__button"
                        onClick={this.handleRefuse}
                      >
                        Refuse
                      </Button>
                    </>
                  )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default withRouter(ApplicationCard);

ApplicationCard.defaultProps = {
  viewProfile: false,
  hireMe: false,
};

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    member_id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    proposal: PropTypes.string.isRequired,
    // status: PropTypes.string.isRequired,
  }).isRequired,
  applicantMemberId: PropTypes.number.isRequired,
  viewProfile: PropTypes.bool,
  hireMe: PropTypes.bool,
  defaultAvatar: PropTypes.string.isRequired,
};
