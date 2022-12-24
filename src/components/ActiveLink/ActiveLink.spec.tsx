import { render } from '@testing-library/react';
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
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    // debug();
    expect(getByText(internalName)).toBeInTheDocument();
    // expect(getByText(`${internalName}2`)).not.toBeInTheDocument();
  });
  
  it("should be receiving active class", () => {
    const internalName = 'Home';
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    // debug();
    expect(getByText(internalName)).toHaveClass('active');
  });
  
  it("should not receive active class when the path is not the same as the current", () => {
    const internalName = 'Home';
    const { debug, getByText } = render(
      <ActiveLink href="/outro" activeClassName="active">
        <span>{internalName}</span>
      </ActiveLink>
    );
  
    // debug();
    expect(getByText(internalName)).not.toHaveClass('active');
  });
});
