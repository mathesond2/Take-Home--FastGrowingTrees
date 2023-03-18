import { CartProvider } from '@/util/CartContext';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { cartCounterId } from '../../components/Cart/Cart';
import Navbar from '../../components/Navbar';
import ProductPage from '../../pages/product/[id]';

const product = {
  id: 4813305610302,
  title: 'Corona ClassicCUT® Pruners - 3/4 in.',
  src: 'https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Corona_Pruner_600x600_ed156d74-9ce0-43b3-82ad-986a24d0ead3.jpg?v=1620936001',
  body: "When it comes to pruning, it's critical to protect your plants and shrubs with the right equipment - including sharp, sturdy pruners that will allow you to make a clean cut. Whether you're pruning to shape your plants, remove dead branches or encourage flower and fruit development, these Corona ClassicCUT® Pruners will do the job.",
  product_type: 'Hard Good',
  price: 14.95,
  alt: null,
};

describe('Product page', () => {
  it('renders page with elements', () => {
    const { src, title, body } = product;
    render(<ProductPage product={product} />);

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
        <Navbar />
        <ProductPage product={product} />
      </CartProvider>,
    );
    const button = screen.getByRole('button', { name: /add to cart/i });

    fireEvent.click(button);
    let cartCounter = await screen.findByTestId(cartCounterId);
    expect(cartCounter).toHaveTextContent('1');

    fireEvent.click(button);
    cartCounter = await screen.findByTestId(cartCounterId);
    expect(cartCounter).toHaveTextContent('2');
  });
});
