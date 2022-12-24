import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: 'Post content',
  updatedAt: '10 de Abril',
};

describe('Posts page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });

  it('should redirect user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValue(null);

    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValue({
      getByUID: jest.fn().mockResolvedValue(null),
    } as any);

    const response = await getServerSideProps({
      params: { slug: post.slug },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      }),
    );
  });

  it('should loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValue({
      activeSubscription: 'fake-active-subscription',
    } as any);

    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    await getPrismicClientMocked.mockReturnValue({
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

    const response = await getServerSideProps({
      params: { slug: post.slug },
    } as any);

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
