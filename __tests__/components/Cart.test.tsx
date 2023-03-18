import { CartContext, CartProvider } from '@/util/CartContext';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Cart from '../../components/Cart/Cart';
import ProductPage from '../../pages/product/[id]';
import { formatUSD, testProduct } from '../../util';

describe('Cart', () => {
  it('renders with product details', async () => {
    const { src, title, price } = testProduct;
    const value = {
      cart: [testProduct],
      setCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>,
    );

    const cartButton = screen.getByLabelText('cart');
    expect(cartButton).toBeInTheDocument();
    fireEvent.click(cartButton);
    const img = await screen.findByRole('img', { src });
    expect(img).toBeInTheDocument();

    const renderedTitle = screen.getByText(title);
    expect(renderedTitle).toBeInTheDocument();

    const renderedPrice = screen.getAllByText(`$${price}`);
    expect(renderedPrice).toHaveLength(2); //both price and subtotal
  });

  it('updates item quantity and price upon clicking associated buttons', async () => {
    const { title, price } = testProduct;
    render(
      <CartProvider>
        <Cart />
        <ProductPage product={testProduct} />
      </CartProvider>,
    );

    // add product to cart
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    // open cart
    const cartButton = screen.getByLabelText('cart');
    fireEvent.click(cartButton);

    const incrementButton = await screen.getByLabelText(`increase quantity by one (${title})`);
    const subtotal = await screen.findByTestId('subtotal');
    const itemQuantity = await screen.findByTestId(`quantity of ${title.toLowerCase()}`);
    expect(itemQuantity).toHaveTextContent('1');
    expect(subtotal).toHaveTextContent(formatUSD(price));

    // increase quantity and subtotal
    fireEvent.click(incrementButton);
    expect(itemQuantity).toHaveTextContent('2');
    expect(subtotal).toHaveTextContent(formatUSD(price * 2));

    // decrease quantity and subtotal
    const decrementButton = await screen.getByLabelText(`decrease quantity by one (${title})`);
    fireEvent.click(decrementButton);
    expect(itemQuantity).toHaveTextContent('1');
    expect(subtotal).toHaveTextContent(formatUSD(price));

    //ensure that cart counter cannot go below 1 and subtotal does not change
    fireEvent.click(decrementButton);
    expect(itemQuantity).toHaveTextContent('1');
    expect(subtotal).toHaveTextContent(formatUSD(price));

    // remove item from cart
    const removeIcon = screen.getByLabelText('remove from cart');
    fireEvent.click(removeIcon);
    expect(itemQuantity).not.toBeInTheDocument();
  });
});
