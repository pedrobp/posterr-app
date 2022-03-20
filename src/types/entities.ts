export interface Post {
  id: ID
  authorId: ID
  content: string
  createdAt: string
  quoteId?: ID
  repostId?: ID
}

export interface User {
  id: ID
  username: string
  name: string
  joinedOn: string
  following: ID[]
  avatarUrl?: string
}
