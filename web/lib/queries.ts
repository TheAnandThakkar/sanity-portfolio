export const profileQuery = `*[_type == "profile"] | order(_updatedAt desc)[0]{
  name,
  role,
  headline,
  bio,
  photo,
  email,
  github,
  linkedin,
  twitter
}`

export const postsIndexQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  heroImage,
  author->{
    name,
    title,
    image
  }
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  heroImage,
  author->{
    name,
    title,
    image,
    bio
  },
  body
}`
