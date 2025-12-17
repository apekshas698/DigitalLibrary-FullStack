# 📚 FullStack Digital Library AI Project

A professional Full Stack Digital Library web application built using **Spring Boot**, **MongoDB**, and **React**. This application automates book cataloging using **Google Gemini AI** (Vertex AI) to generate descriptions and features a secure, multi-role user management system.



## 🔧 Tech Stack

### Backend (Java - Spring Boot)
- **Spring Boot 3.5.5**: Core framework for RESTful API development.
- **Java 20**: Utilizing modern Java features and performance improvements.
- **Spring Security with JWT**: Stateless authentication and role-based access control.
- **MongoDB Atlas**: Cloud NoSQL database for flexible book and review storage.
- **Google Vertex AI (Gemini 1.5 Flash)**: Integrated via gRPC for high-performance AI content generation.

### Frontend (React)
- **React JS**: Component-based UI development.
- **Axios**: For secure communication with the Spring Boot API.
- **React Router**: For seamless navigation between library views.
- **Tailwind CSS**: Modern, responsive styling for the dashboard and book list.

---

## ✨ Key Features

### 🤖 AI Content Engine
- **Automated Book Descriptions**: Generates or improves book descriptions instantly using the Gemini model.
- **Metadata Enhancement**: Smartly interprets Title, Author, and Category to provide contextual data.
- **Error Handling**: Graceful fallbacks for API quotas or service downtime.

### 👤 User Features
- **Real-time Search**: Browse digital collections with an optimized search interface.
- **Semantic Discovery**: Capability to find books by thematic meaning rather than just keywords.
- **Personalized Dashboard**: Manage borrowed books, track due dates, and view history.
- **Secure Authentication**: JWT-based login/register with automated session expiration.

### 🔐 Admin Features
- **Librarian Dashboard**: Centralized overview of inventory stats, active borrows, and user activity.
- **AI-Assisted Cataloging**: One-click "Generate Description" for new book entries.
- **User Management**: Monitor and manage user roles and system access.
- **Review Insights**: View and summarize user feedback using AI-driven tools.

---

## 📂 Project Structure

```
DigitalLibrary/
├── DigitalLibrary/            # Spring Boot application
│   ├── src/            # Java source code & Gemini AI Service
│   ├── pom.xml         # Maven dependencies (VertexAI, JWT, etc.)
│   └── application.properties
├──DigitalLibraryfrontend/           # React application (Vite)
│   ├── src/            # Components, Hooks, and Services
│   ├── public/
│   └── package.json
```

## 🚀 Getting Started
### 1. Clone the Repository
```bash
git clone [https://github.com/apekshas698/DigitalLibrary.git](https://github.com/apekshas698/DigitalLibrary.git)
cd DigitalLibrary
```
### Setup Backend

1. Navigate to the backend folder:
   ```bash
   cd DigitaLibrary
   ```

2.  Update MongoDB URI in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/library
   gcp.project.id=YOUR_PROJECT_ID
   gcp.location=us-central1
   jwt.secret=yourSecure64CharacterSecretKey
   
   ```

3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

### Setup Frontend

1. Navigate to the frontend folder:
   ```bash
   cd DigitalLibraryfrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

---
## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Author

**Apeksha Shukla**  
- GitHub: [@apekshas698](https://github.com/apekshas698)  
