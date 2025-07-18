# BitLinks - A Simple URL Shortener

![BitLinks](https://placehold.co/600x300/6D28D9/FFFFFF?text=BitLinks)

BitLinks is a straightforward and efficient URL shortener built with Next.js, React, and MongoDB. It allows users to take long, cumbersome URLs and convert them into short, easy-to-share links. Users can also create custom-named short links for better branding and memorability.

## ✨ Features

* **Shorten URLs:** Quickly convert any long URL into a compact one.
* **Custom Short Links:** Personalize your links with a custom alias.
* **Fast Redirects:** Instantaneously redirects users from the short link to the original destination.
* **Minimalist UI:** A clean and simple interface built with Tailwind CSS.
* **No Login Required:** Shorten URLs without the need for an account.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **UI Library:** [React](https://reactjs.org/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

* [Node.js](https://nodejs.org/) (v18.18.0 or later recommended)
* [npm](https://www.npmjs.com/get-npm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/bit-links.git](https://github.com/your-username/bit-links.git)
    cd bit-links
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env.local` in the root of your project and add the necessary environment variables. See the [Environment Variables](#-environment-variables) section below for details.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

`MONGODB_URI`: Your MongoDB connection string. This is used to connect to your database where the URL mappings are stored.

`NEXT_PUBLIC_HOST`: The public URL of your application. For local development, this will be `http://localhost:3000`.

**Example `.env.local` file:**

```env
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/bitlinks?retryWrites=true&w=majority"
NEXT_PUBLIC_HOST="http://localhost:3000"
```
> **Note:** Replace the `MONGODB_URI` value with your actual MongoDB connection string. If you are running MongoDB locally, it might look like `mongodb://localhost:27017/bitlinks`.

## 📦 API Endpoints

The primary API endpoint for creating short links is:

### `POST /api/generate`

This endpoint creates a new short URL and stores it in the database.

**Request Body:**

```json
{
  "url": "[https://your-very-long-url-to-shorten.com/with/some/path](https://your-very-long-url-to-shorten.com/with/some/path)",
  "shorturl": "my-custom-link"
}
```

**Response:**

* **Success (200):**
    ```json
    {
      "success": true,
      "error": false,
      "message": "URL generated Successfully"
    }
    ```
* **Failure (URL already exists):**
    ```json
    {
      "success": false,
      "error": true,
      "message": "URL already exists!"
    }
    ```
