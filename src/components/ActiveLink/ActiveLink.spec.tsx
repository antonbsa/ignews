import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    }
  }
})

describe('ActiveLink component', () => {
  it("should renders correctly", () => {
    const internalName = 'Home';
    render(
      <ActiveLink href="/" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    expect(screen.getByText(internalName)).toBeInTheDocument();
  });
  
  it("should be receiving active class", () => {
    const internalName = 'Home';
    render(
      <ActiveLink href="/" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    expect(screen.getByText(internalName)).toHaveClass('active');
  });
  
  it("should not receive active class when the path is not the same as the current", () => {
    const internalName = 'Home';
    render(
      <ActiveLink href="/outro" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    expect(screen.getByText(internalName)).not.toHaveClass('active');
  });
});
