import { IOwner } from 'entities/Owner';

export interface Repository {
  name: string;
  url: string;
  pushedAt: string;
  totalCount: number;
  id: number
}

export interface RepositoriesSchema {
  data: Repository[];
  loading: boolean;
  error?: Error
}

export interface Edge {
  name: string,
  id: number
  pushedAt: string,
  stargazers: {
    totalCount: number
  }
  url: string
}

export interface Languanges {
  edges: {
    node: {
      name: string
    }
  }[]
}

export interface RepositoryInfo extends Edge {
  owner: IOwner
  languages: Languanges,
  description: string | null
}

export interface NormalizedRepozitory extends Repository{
  owner: IOwner,
  languages: string[]
  description: string | null
}