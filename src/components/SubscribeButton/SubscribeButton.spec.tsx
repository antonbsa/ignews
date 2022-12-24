import { render, screen, fireEvent } from '@testing-library/react';
import { SessionContextValue, signIn, useSession } from 'next-auth/react';
import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router', () => {
  return { useRouter: jest.fn() };
});

describe('SubscribeButton component', () => {
  it("should renders correctly ", () => {
    const usesessionMocked = jest.mocked(useSession);
    usesessionMocked.mockReturnValueOnce({ data: null } as SessionContextValue);

    render(<SubscribeButton />);
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it("should redirect user to sign in when not authenticated", () => {
    const usesessionMocked = jest.mocked(useSession);
    usesessionMocked.mockReturnValueOnce({ data: null } as SessionContextValue);

    const signinmocked = jest.mocked(signIn);
    render(<SubscribeButton />);
    const subscribeButton = screen.getByText('Subscribe now');
    

    fireEvent.click(subscribeButton);
    expect(signinmocked).toHaveBeenCalled();
  });

  it("should redirect to posts when user already has a subscription", () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const pushMocked = jest.fn();
    useRouter.mockImplementation(() => ({
      pathname: '/',
      push: pushMocked,
    }));

    const useSessionMocked = jest.mocked(useSession);
    const mockedData = {
      user: {
        name: 'John Doe',
        email: 'johnDoe@example.com',
      },
      activeSubscription: 'fake-active-subscription',
    };
    useSessionMocked.mockReturnValueOnce({ data: mockedData } as SessionContextValue);

    render(<SubscribeButton />);
    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);
    expect(pushMocked).toHaveBeenCalledWith('/posts');
  });
});
