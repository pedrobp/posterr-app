# Pedro Pimenta - Posterr Challenge

## Setup and Run

Run the commands below to start the app:

- `yarn install` and `yarn start`

OR

- `npm i` and `npm start`

## Application Overview

Posterr was built using React with Typescript. The most important external libraries used were `date-fns` for date/time handling, `tailwindcss` as a css framework and processor, `eslint` for code linting, `phosphor-react` for icons and a few other ones.

Most of the application was built using hooks and modern React practices. A state management solution such as `redux` was not needed in my opinion, so I decided to work with `contexts`.

The app uses the browser's local storage to handle/store the data, but some mocked/fake api calls can be found in `src/api/apiMock`. On the first time the app loads, an initial dataset with a few users and posts is loaded to the local storage in case it doesn't have any data yet.

It is possible to simulate a login with another account by changing the current "logged" user on the top-right corner menu.

Extra feature `Search` was implemented.

## Planning

For the reply-to-post feature, I would try to follow the steps below for the front-end:

- Change the Post interface, to include a `replyId` property
- Create sections/tabs on the user's profile page, to change between the feeds
- Create a modal similar to the "quote" feature, where the user would click a reply button on post, and it would show up with the input for them to enter the desired message, after the appended username of the replied post's author
- Create a post with the `replyId` set
- Ask about how would it be rendered in terms of design/UI

Back-end:

- Possibly create a new table/schema for replies only

OR

- Add a new column to the posts table, to make a reference to the replied post and save it's ID, similar to the front-end

## Critique

The application could still definitely be improved in many ways, if I had more time. One of the next steps would be to implement unit tests, to ensure that a few key actions/components will always be working as intended.

Another key step would be making the layout of the page 100% responsive and ready for mobile-sized screens. It's a social media after all :)

Also, polish the UI & UX a little more, by creating a few more animations (e.g. Modal opening), some better validations and user feedbacks.

As for scaling, one of the main issues is of course dealing with local storage. Since there is no API or database, the app is not able to query results, therefore are some expensive operations being done completely on the front-end, such as sorting posts, iterating through users, which would be way less costful if done with appropriate tools. I could see both SQL (like Postgres) and NoSQL (like MongoDB) databases working nicely here.

Another scaling issue is, at this moment, all posts are loaded at once. The more posts the app has, the less viable it would become to load all these posts. A pagination system would have to be implemented to load batches of posts at each time.

Finally, searching posts is being done in the front-end and that's definitely sub-optimal. A search platform such as Solr or Elastic would be better to query through the posts and suggest the best results.
