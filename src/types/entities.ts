export interface Post {
  id: ID
  authorId: ID
  content: string
  createdAt: string
}

export interface User {
  id: ID
  username: string
  name: string
  joinedOn: string
  followers: ID[]
  following: ID[]
  posts: ID[]
}
