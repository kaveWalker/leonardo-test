import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query GetCharacters($page: Int!) {
  characters(page: $page) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
    }
  }
}
`

export const GET_CHARACTER_BY_ID = gql`
query GetCharacterById($id: String!) {
  character (id: $id) {
    name
    status
    species
    gender
    image
    created
  }
}
`