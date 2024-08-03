# Jokes Application Frontend (Next.js)

This frontend application allows users to view, submit, and moderate jokes.

## Technologies Used

- Next.js
- NodeJs
- Docker

## Setup Instructions

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Ratheshan03/frontend-nextjs.git
   cd frontend-nextjs
   ```

## Getting Started

### Install Dependencies

- Npm install

### Run the Server

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### In order to run the application Prperly You have to run the 3 Microservices Too.

- git clone https://github.com/ratheshan03/deliver-jokes-microservices.git
- git clone https://github.com/ratheshan03/submit-jokes-microservices.git
- git clone https://github.com/ratheshan03/moderate-jokes-microservices.git

Once Front end and other Microservces were cloned and installed to the same directory, user should run the docker compose command to run the Microservices and then run the front end separately.

## Support

Still in-progress:

## License

NextJS is [MIT licensed](LICENSE).
