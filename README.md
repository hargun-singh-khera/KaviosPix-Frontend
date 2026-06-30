# Albumix Frontend

Albumix is a collaborative photo gallery application that makes it easy to organize, upload, and share memories with others. Users can authenticate using Google OAuth, create albums, upload photos to Cloudinary, collaborate by sharing albums, comment on images, and mark their favorite moments. This repository contains the React frontend for Albumix, including authentication, album management, image workflows, collaboration, and media viewing.

The application connects to a deployed Albumix backend API and uses JWT-based authentication to protect all application routes.

---

## Demo Link

Live Demo: `https://albumix-omega.vercel.app`

Backend API: `https://albumix-backend-pied.vercel.app`

---

## Login

Albumix uses **Google OAuth** for authentication.

Simply click **Continue with Google** on the login page to sign in. After successful authentication, a JWT token is issued by the backend and stored locally to provide secure access to protected routes.

---

## Quick Start

```bash
git clone https://github.com/hargun-singh-khera/Albumix.git
cd Albumix
npm install
npm run dev
```

The development server will start on the Vite local URL, usually:

```bash
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root and add:

```env
VITE_SERVER_BASE_URL=http://localhost:3000
```

---

## Technologies

### Frontend

- React JS
- Vite
- React Router
- Bootstrap
- Bootstrap Icons
- Axios
- React Select
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google OAuth
- Multer
- Cloudinary

---

## Features

### Authentication

- Google OAuth authentication
- JWT-based authorization
- Protected application routes
- Automatic session management
- Secure authentication flow

### Dashboard

- View all owned and shared albums
- Search albums by name
- Create new albums
- Edit album details
- Delete albums
- Share albums with other registered users
- Album thumbnails with image counts

### Albums

- View album details
- Upload photos directly into albums
- View total image count
- Filter between all photos and favorite photos
- Album descriptions
- Shared album support

### Photos

- Upload photos using Multer and Cloudinary
- Store media securely in Cloudinary
- Add custom tags while uploading
- Tag a person in a photo
- View image metadata
- Mark photos as favorites
- Remove photos
- View upload date and file size
- Full-size image preview

### Collaboration

- Share albums with registered users
- Access albums shared by other users
- Collaborate within shared photo collections

### Comments

- View image comments
- Add comments to photos
- Display commenter information and timestamps
- Real-time comment updates after posting

---

## Project Structure

```bash
src
|-- assets
|-- components
|   |-- Modals
|   |   |-- AddImageModal.jsx
|   |   |-- AlbumModal.jsx
|   |   `-- AlbumShareModal.jsx
|   |-- GoogleProfile.jsx
|   |-- Header.jsx
|   `-- PlaceholderAlbumCard.jsx
|-- lib
|-- pages
|   |-- AlbumDetails.jsx
|   |-- Dashboard.jsx
|   |-- ImageDetails.jsx
|   `-- UserAuth.jsx
|-- App.jsx
|-- constants.js
|-- main.jsx
`-- index.css
```

---

## Routes

| Route | Description |
| ------ | ----------- |
| `/` | Google authentication page |
| `/dashboard` | View all albums and create new ones |
| `/album/:albumId` | Album details and image gallery |
| `/album/:albumId/image/:imageId` | Image details, metadata, favorites, and comments |

---

## Backend

This frontend communicates with a separate Albumix backend API.

The backend is responsible for:

- Google OAuth authentication
- JWT generation and verification
- Album management
- Image uploads using Multer
- Cloudinary media storage
- Album sharing
- Comments
- MongoDB data persistence

Backend setup, API documentation, database configuration, and deployment instructions should be maintained in the backend repository README.

---

## Contact

For bugs, improvements, or feature requests, please reach out to hargunsinghkhera8@gmail.com.