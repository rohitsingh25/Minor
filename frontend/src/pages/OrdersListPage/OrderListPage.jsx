import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { listOrders, returnOrder } from '../../redux/reducers/order/order.actions';

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);
  
  const orderReturn = useSelector((state) => state.orderReturn);
  const { success: successReturn, loading: loadingReturn, order: returnedOrder } = orderReturn;

  console.log('order return', orderReturn);

  useEffect(() => {
    if (successReturn) history.push('/admin/orderList');
  }, [successReturn]);

  const returnHandler = (order) => {
    dispatch(returnOrder(order));
  };

  console.log('orders', orders)

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              {/* <th>TOTAL</th> */}
              {/* <th>PAID</th> */}
              {/* <th>DELIVERED</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)} </td>

                <td>
                  <i className='fas fa-check' style={{ color: 'green' }} />
                </td>
                <td>
                  {/* <LinkContainer to={`/order/${order._id}`}> */}
                  {returnedOrder && returnedOrder._id === order._id && returnedOrder.isReturned ? (
                    <Button variant="light" className='btn-sm'>
                      RETURNED
                    </Button>
                  ) : order.isReturned ? (
                    <Button variant="light" className='btn-sm'>
                      RETURNED
                    </Button>
                  ) : (
                    <Button variant='dark' className='btn-sm' onClick={() => returnHandler(order)}>
                      RETURN
                    </Button>
                  )}
                  {/* </LinkContainer> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
