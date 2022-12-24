import { render, screen } from '@testing-library/react';
import { useSession, SessionContextValue } from 'next-auth/react';
import { SingInButton } from '.';

jest.mock('next-auth/react');

describe('SingInButton component', () => {
  it("should renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null } as SessionContextValue);

    render(<SingInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it("should renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    const mockedData = {
      user: {
        name: 'John Doe',
        email: 'johnDoe@example.com',
      }
    };
    useSessionMocked.mockReturnValueOnce({ data: mockedData } as SessionContextValue);

    render(<SingInButton/>);

    expect(screen.getByText(mockedData.user.name)).toBeInTheDocument();
  });
});
