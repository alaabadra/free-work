import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';

import myOffersDetails from '../utils/myOffers';

import './style.css';

class MyOffers extends Component {
  state = {
    offers: null,
  };

  componentDidMount() {
    this.setState({ offers: myOffersDetails });
  }

  statusClassName = status => {
    return `myoffers__status--${status}`;
  };

  render() {
    const { offers } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <Container>
        <h1 className="myoffers__header"> My Offers </h1>
        <Row>
          {offers ? (
            offers.map(item => {
              return (
                <Col xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    className="myoffer__card"
                    key={item.id}
                    onClick={() => history.push(`/app/offers/${item.id}`)}
                  >
                    <Card.Header className="myoffer__card-header">
                      <Card.Text
                        className={`myoffers__status ${this.statusClassName(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </Card.Text>
                    </Card.Header>
                    <Card.Body className="myoffers__body">
                      <Card.Text className="myoffers__title">
                        {item.title}
                      </Card.Text>
                      <Card.Text className="myoffers__position">
                        {item.position}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Spinner animation="border" variant="info" />
          )}
        </Row>
      </Container>
    );
  }
}

export default withRouter(MyOffers);
