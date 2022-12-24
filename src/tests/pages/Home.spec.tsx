import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false],
  }
});
jest.mock('../../services/stripe');


describe('Home page', () => {
  it('should renders correctly', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      pathname: '/',
    }));

    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 10,00' }} />);
    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument();
  });

  it('should loads initial data', async () => {
    const retrieveStripePriceMocked = jest.mocked(stripe.prices.retrieve);
    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          }
        }
      }),
    );
  });
});