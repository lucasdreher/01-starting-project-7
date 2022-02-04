import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(
		() => {
			const sendCartData = async () => {
				dispatch(
					uiActions.showNotification({
						status: 'pending',
						name: 'Sending...',
						message: 'Sending cart data!'
					})
				);
				const response = await fetch(
					'https://react-http-88f71-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
					{
						method: 'PUT',
						body: JSON.stringify(cart)
					}
				);

				if (!response.ok) {
					throw new Error('Sending cart data failed');
				}
				// const responseData = await response.json();

				dispatch(
					uiActions.showNotification({
						status: 'success',
						name: 'Success!',
						message: 'Sent cart data successfully!'
					})
				);
			};

			if (isInitial) {
				isInitial = false;
				return;
			}

			sendCartData().catch((error) => {
				dispatch(
					uiActions.showNotification({
						status: 'error',
						name: 'Error!',
						message: 'Sending cart data failed!'
					})
				);
			});
		},
		[ cart, dispatch ]
	);

	return (
		<Fragment>
			{notification && (
				<Notification status={notification.status} name={notification.name} message={notification.message} />
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
