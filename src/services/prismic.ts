import * as prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const repoName = 'IgnewsAntonbsa';
  const endpoint = prismic.getRepositoryEndpoint(repoName);
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });

  return client;
}