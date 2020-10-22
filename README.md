# Next.js - The data story (A blog built with Next.js & AWS)

> This code goes along with my tutorial [Next.js - The Data Story](https://dev.to/dabit3/next-js-the-data-story-2b0d)

![Next.js - The data story](header.jpg)

### To deploy the authentication and API services and run the app, follow these steps:

1. Clone the repo

```sh
git clone https://github.com/dabit3/nextjs-data-story.git
```

2. Change into the directory and install the dependencies

```sh
cd nextjs-data-story

npm install
```

3. Initialize the Amplify project

```sh
amplify init
```

4. Deploy the authentication service

```sh
amplify push --y
```

5. Run the app locally

```sh
npm run dev
```

## Deploying with Serverless Framework

```sh
npx serverless
```