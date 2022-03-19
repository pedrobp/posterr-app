export interface Post {
  id: ID
  authorId: ID
  content: string
  createdAt: Date
}

export interface User {
  id: ID
  username: string
  joinedOn: Date
  followers: ID[]
  following: ID[]
  posts: ID[]
}
