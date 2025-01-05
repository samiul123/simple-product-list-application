# Simple Product List Application

## Overview
This project is a web application that displays a list of products in a card format. Users can view product cards and delete them. The application consists of a React frontend and a Node.js backend.

## Tech Stack
- **Frontend:** React, Material UI, Axios
- **Backend:** Node.js, Express.js

## Features
- Display a list of products in a card format.
- Each card shows:
  - Product name
  - Product description
  - Product price
  - Product image
- Delete a product from both frontend and backend.
- Responsive design with centered card layout.
- Data persists and fetches from the backend on page refresh. 


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.13.1)
- [npm](https://www.npmjs.com/) (10.8.1)


## Setup Instructions

### Step 1: Clone the Repository
Run the following commands to clone the repository and navigate to the project directory.
```bash
git clone <repository-url>
cd simple-product-list-application
```

### Step 2: Launch the Backend
- Navigate to the `StarterCode/backend` directory.
  ```bash
  cd StarterCode/backend
  ```

- Install the required dependencies.
  ```bash
  npm install
  ```
  
- Create **.env** file and put the appropriate value of the `PORT` variable. Note, this step is optional. Default value is `5000`.
  ```bash
  touch .env
  echo "PORT=<backend_port>" > .env
  ```

- Start the backend server.
  ```bash
  npm start
  ```
  The backend will run on either `http://localhost:<backend_port>` or `http://localhost:5000`.

  ### All Backend Environment Variables
  | **Environment Variable**      | **Description**                                                                                                                           | **Default Value**         |
  |-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
  | `LOG_FILE_NAME`               | Specifies the log file name and rotation pattern.                                                                                         | `logs/app-%DATE%.log`     |
  | `LOG_ROTATION_DATE_PATTERN`   | Defines the frequency of log file rotation.                                                                                               | `YYYY-MM-DD`              |
  | `LOG_ZIP_ARCHIVED`            | Whether to compress old log files after rotation.                                                                                         | `true`                    |
  | `LOG_FILE_MAX_SIZE`           | Maximum size of a log file before it gets rotated.                                                                                        | `10m`                     |
  | `LOG_MAX_KEEP`                | Number of days or log files to retain before deletion. Use 'd' suffix to denote days, otherwise, this represents number of files to keep. | `10d`                     |
  | `LOG_LEVEL`                   | Logging level for the application.                                                                                                        | `info`                    |
  | `PORT`                        | Port on which the application runs.                                                                                                       | `5000`                    |



### Step 3: Launch the Frontend
- Navigate to the `StarterCode/frontend` directory.
  ```bash
  cd StarterCode/frontend
  ```
- Install the required dependencies.
  ```bash
  npm install
  ```
- Create **.env** file and put the appropriate value of the `REACT_APP_BASE_URL` variable. This variable sets the base URL to connect to the backend server. Remember, the port in `REACT_APP_BASE_URL` should match the `backend_port`. Note, this step is optional. Default value is `http://localhost:5000`.
  ```bash
  touch .env
  echo "REACT_APP_BASE_URL=<base_url>" > .env
  ```
- Start the frontend.
  ```bash
  npm start
  ```

  The frontend will start on `http://localhost:3000`. Open the browser and hit this url. You will see all the available products.

## API Endpoints
GET `/api/products` - Fetches a list of products with randomly generated image URLs.

DELETE `/api/products/:id` - Deletes a product by its ID.



