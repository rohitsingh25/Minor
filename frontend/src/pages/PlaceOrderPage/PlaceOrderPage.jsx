import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../redux/reducers/order/order.actions';
import {
  resetCart,
} from '../../redux/reducers/cart/cart.actions';
import { ListGroup, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/errormessage/errormessage';
// import CheckoutSteps from '../../components/checkoutsteps/CheckoutSteps';
import Swal from 'sweetalert2';

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartReset = useSelector((state) => state.cart);
  const { cart: cartUpdated, success: CartSuccess, error: CartError } = cart;


  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    // if (success) history.push(`/order/${order._id}`);
    // if (success) history.push(`/`);
  }, [success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    dispatch(resetCart())
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Items booked Successfully!',
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Booking Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart Is Empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                        <Col md={4}>
                          {item.quantity} 
                          {/* x ${item.price} 
                          {item.quantity * item.price} */}
                        </Col>
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
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Booking
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
