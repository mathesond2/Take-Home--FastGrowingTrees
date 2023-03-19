import { CartProvider } from '@/util/CartContext';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Cart from '../../components/Cart/Cart';
import ProductPage from '../../pages/product/[id]';
import { testProduct } from '../../util';
import { CART_COUNTER_ID } from '../../util/constants';

describe('Product page', () => {
  it('renders page with elements', () => {
    const { src, title, body } = testProduct;
    render(<ProductPage product={testProduct} />);

    const image = screen.getByRole('img', { src });
    expect(image).toBeInTheDocument();

    const renderedTitle = screen.getByText(title);
    expect(renderedTitle).toBeInTheDocument();

    const renderedBody = screen.getByText(body);
    expect(renderedBody).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('updates ticker quantity upon clicking button', async () => {
    render(
      <CartProvider>
        <Cart />
        <ProductPage product={testProduct} />
      </CartProvider>,
    );
    const button = screen.getByRole('button', { name: /add to cart/i });

    fireEvent.click(button);
    let cartCounter = await screen.findByTestId(CART_COUNTER_ID);
    expect(cartCounter).toHaveTextContent('1');

    fireEvent.click(button);
    cartCounter = await screen.findByTestId(CART_COUNTER_ID);
    expect(cartCounter).toHaveTextContent('2');
  });
});
