import { render, screen } from '@testing-library/react';
import Home from '../../pages';

jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false],
  }
});


describe('Home page', () => {
  it('should renders correctly', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      pathname: '/',
    }));

    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 10,00' }} />);
    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument();
  });
});