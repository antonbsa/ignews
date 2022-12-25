import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/react');
jest.mock('next/router', () =>{
  return { useRouter: jest.fn() };
});
jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: 'Post content',
  updatedAt: '10 de Abril',
};

describe('Post preview page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      pathname: '/',
    }));
    jest.mocked(useSession).mockReturnValue({ data: null } as any);

    render(<Post post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('should redirect user to full post when user is subscribed', async () => {
    const mockedData = {
      user: {
        name: 'John Doe',
        email: 'johnDoe@example.com',
      },
      activeSubscription: 'fake-active-subscription',
    };
    const pushMocked = jest.fn();
    jest.mocked(useSession).mockReturnValue({ data: mockedData } as any);
    jest.mocked(useRouter).mockReturnValue({ push: pushMocked } as any);

    render(<Post post={post} />);

    expect(pushMocked).toHaveBeenCalledWith(`/posts/${post.slug}`);
  });

  it('should loads initial data', async () => {
    await jest.mocked(getPrismicClient).mockReturnValue({
      getByUID: jest.fn().mockResolvedValue({
        uid: 'my-new-post',
        data: {
          title: [
            { type: 'heading', text: post.title }
          ],
          content: [
            { type: 'paragraph', text: post.content }
          ],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: post.slug },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: post.slug,
            title: post.title,
            content: `<p>${post.content}</p>`,
            updatedAt: '01 de abril de 2021',
          },
        },
      }),
    );
  });
});
