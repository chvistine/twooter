/* eslint-disable max-lines-per-function */
import {GraphQLObjectType, GraphQLInt} from 'graphql'
import requestErrorsType from './requestErrorsType'

const responseType = (childType, childName, dataName) => {
  return new GraphQLObjectType({
    name: `${childName}Response`,
    description: `The response wrapper for ${childName} requests.`,
    fields: {
      status: {
        type: GraphQLInt,
        resolve: (response) => response.status,
        description: 'The HTTP status code that matches the request outcome.'
      },
      requestErrors: {
        type: requestErrorsType,
        resolve: (response) => response.requestErrors,
        description: 'The response errors object for this request.'
      },
      [dataName]: {
        type: childType,
        resolve: (response) => response[dataName],
        description: `The requested ${dataName}.`
      }
    }
  })
}

export default responseType