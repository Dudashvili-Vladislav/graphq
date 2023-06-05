import { RepositoryInfo, NormalizedRepozitory } from './../../types/repositories';
import { gql, useQuery } from '@apollo/client';
import { Edge } from '../../types/repositories';

export const GET_REPOSITORY_DETAILS = gql`
  query ($repositoryId: ID!) {
    node(id: $repositoryId) {
      ... on Repository {
        id
        name
        url
        stargazers {
          totalCount
        }
        pushedAt
        owner {
          avatarUrl
          login
          url
        }
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            node {
              name
            }
          }
        }
        description
      }
    }
  }
`;

const normalizeData = (data: {node: RepositoryInfo}):NormalizedRepozitory | undefined => {
  if(data){
    const { node } = data
    return {
      owner: node.owner,
      languages: node.languages.edges.map(lang => lang.node.name),
      description: node.description,
      pushedAt: node.pushedAt,
      name: node.name,
      url: node.url,
      totalCount: node.stargazers.totalCount,
      id: node.id
    }
  }
}

export const useRepository = (id: string) => {
    const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
        variables: { repositoryId: id },
    });
    return { loading, data: normalizeData(data), error}
}