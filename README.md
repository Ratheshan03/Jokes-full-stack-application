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

### In order to run the full application in its intended way, You have to run the 3 Microservices along with this frontend in Docker.

- git clone https://github.com/ratheshan03/deliver-jokes-microservices.git
- git clone https://github.com/ratheshan03/submit-jokes-microservices.git
- git clone https://github.com/ratheshan03/moderate-jokes-microservices.git

Once Front nd and other Microservices were cloned and installed to the same directory, user should run the docker compose file (download the file from this repository root directory) and run the command to start the Microservices.
This will enable the full potential of the Jokes Application.

## Still in-progress: To-do List
 - Frontend Styling
 - Deployment
 - Integration of CI/CD Pipelines

## License

NextJS is [MIT licensed](LICENSE).
