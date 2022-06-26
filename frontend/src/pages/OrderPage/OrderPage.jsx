import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from '../../redux/reducers/order/order.actions';
import { ListGroup, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
// import { OrderActionTypes } from '../../redux/reducers/order/order.types';

const OrderPage = ({ history, match }) => {
  // const orderId = match.params.id;
  // const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // const orderPay = useSelector((state) => state.orderPay);
  // const { success: successPay, loading: loadingPay } = orderPay;

  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // if (!loading) {
  //   //calculate price
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };

  //   order.itemsPrice = addDecimals(
  //     order.orderItems.reduce(
  //       (acc, item) => acc + item.price * item.quantity,
  //       0
  //     )
  //   );
  // }

  console.log('loading', loading, 'order', order)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, order]);

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  // const deliverHandler = () => {
  //   dispatch(deliverOrder(order));
  // };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Link to='/admin/orderlist' className='btn btn-primary my-3'>
        Go Back
      </Link>{' '}
      <h3>Order {order._id}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* <h2>Shipping</h2> */}
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              {/* <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.PostalCode},{' '}
                {order.shippingAddress.country}
              </p> */}
              {/* {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )} */}
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item> */}
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order Is Empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        {/* <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col> */}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  {order.orderItems.map((item) => {
                    return <span>{item.name}</span>
                  })}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
