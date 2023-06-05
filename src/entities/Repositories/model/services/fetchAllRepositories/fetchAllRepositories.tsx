import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from 'widgets/Search';
import { repositoriesAction } from '../../slice/repositoriesSlice';
import { Edge } from '../../types/repositories';

export const GET_ALL_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
        totalCount
        edges {
          node {
            name
            url
            id
            stargazers {
              totalCount
            }
            pushedAt
          }
        }
      }
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query ($searchKeyword: String!) {
    search(query: $searchKeyword, type: REPOSITORY, first: 100) {
      edges {
        node {
          ... on Repository {
            name
            url
            id
            stargazers {
              totalCount
            }
            pushedAt
          }
        }
      }
    }
  }
`;

const normalizeData = (data:any) => {
  if(data){
    const repositories = data?.viewer?.repositories || data?.search
    return repositories.edges.map(({node}: {node: Edge}) => ({ name: node.name, pushedAt: node.pushedAt, totalCount: node.stargazers.totalCount, url: node.url, id: node.id }))
  }
}



export const useRepositories = () => {
  const searchedName: string = useSelector(getSearch)
  const isSearched: boolean = searchedName === ""
  const { data, loading, error } = useQuery(isSearched ? GET_ALL_REPOSITORIES: SEARCH_REPOSITORIES, {
    variables: {
      searchKeyword: searchedName
    }
  });
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(repositoriesAction.setRepositories(normalizeData(data)))
  }, [data])


  useEffect(() => {
    dispatch(repositoriesAction.setLoading(loading))
  }, [loading])

  useEffect(() => {
    dispatch(repositoriesAction.setError(error))
  }, [loading])

  return { data:normalizeData(data), loading, error }
}