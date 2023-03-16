# Fastest Growing Trees™️

## Get Started

1. Install dependencies: `npm i`.
1. Run development server: `npm run dev`
1. Open [http://localhost:3000](http://localhost:3000)

API routes may be accessed via:

- [http://localhost:3000/api/products](http://localhost:3000/api/products)
- [http://localhost:3000/api/product/PRODUCT_ID](http://localhost:3000/api/product/PRODUCT_ID)

## Build &amp; test

- run `npm run test` to run both API and UI unit tests
- run `npm run build` to create the production build

## Main tools used

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

## Implementation details

1. Future thoughts (if I had more time)
   1. modify the given JSON data schema, using 'id' as key for faster product lookup
   2. persist cart data further via localStorage
1. The application was created via static site generation as performance was a primary focal point in my decisions (per our prior conversation on the new fastgrowingtrees site).
1. Considering this as a production environment, I chose not to use the latest NextJS `/app` features (still in beta), instead leveraging what is possible in Next13 using the existing `/pages` directory.
1. The given JSON file's products contained some unnecessary data (for the designs given), so I parsed them out at the API level to reduce complexity on the UI side, only using what is needed now.
1. Unit tests are placed by their associated files to encourage modularity.
