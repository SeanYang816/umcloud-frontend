// src/components/ApolloProviderWrapper.js

import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as DefaultApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

interface ApolloProviderWrapperProps {
  children: React.ReactNode
}

export const ApolloProvider: React.FC<ApolloProviderWrapperProps> = ({
  children,
}) => {
  const token = useSelector(
    (state: DefaultRootStateProps) => state.authentication.token,
  )
  const uri = `${window.__CONFIG__.VITE_APP_BACKEND_URI}/graphql`

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : 'Unauthorized Bro!!!', // Include token in the headers if available
      },
    }
  })

  const httpLink = createHttpLink({ uri })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  )
}
