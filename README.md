# Generative AI Chatbot for Frontline Customer Support

This project demonstrates the implementation of a **Generative AI chatbot** designed to provide frontline customer support. It leverages the **GPT-4 OpenAI Assistants API** to respond to product-related FAQ queries. The chatbot also includes a fallback mechanism to guide users when their questions fall outside the provided FAQ knowledge base.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [FAQ Integration](#faq-integration)

## Project Overview

The chatbot acts as the first point of contact for customers, answering common product-related questions based on a provided FAQ document. If the chatbot cannot find an answer in the knowledge base, it directs the user to live customer support.

## Features

- **Interactive Chat Interface**: A user-friendly interface where customers can interact with the chatbot.
- **FAQ-based Responses**: The chatbot generates responses by leveraging the GPT-4 API and the provided FAQ document.
- **Fallback for Out-of-Scope Queries**: When the chatbot cannot answer a question, it directs the user to live support
- **Live Support Integration**: Optionally, the chatbot can hand over certain queries to a live support agent.

## Technologies Used

- **React JS**: Frontend framework used to build the chatbot client.
- **GPT-4 OpenAI Assistants API**: Provides the AI-powered natural language responses based on the FAQ document.
- **Node.js**: Backend API for handling API requests to GPT-4.
- **CSS/SCSS**: For styling the user interface.
- **Git**: Version control.

## Installation Instructions

### Setup the environment variables

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/IamZhenHong/asurion_nodejs.git
   ```
   - cd your-repo
  

2. **Set up the Backend**
   - Navigate to backend folder
   - Install dependencies
     ```
     npm install
     ```
   - Run the backend
     ```
     npm start
     ```

3. **Set up the Frontend**
   - Navigage to frontend folder
   - Install dependencies
     ```
     npm install
     ```
   - Run the frontend
     ```
     npm start
     ```

 4. **Set up the environment variables**
    - Create a .env file at backend directory
    - Add the following to .env file
    ```
    OPENAI_API_KEY = 'your_api_key'
    ```
    ```
    ASSISTANT_ID = 'your_assitant_id
    ```
    * The Assistant ID can be obtained from the OpenAI Assistants API UI.
    * The OpenAI API key can be obtained by signing up and generating an API key from OpenAI.

Open http://localhost:3000 in your browser to interact with the chatbot.

## FAQ Integration

To integrate the FAQ document into the GPT-4 Assistant API, follow these steps:

### 1. Upload Your FAQ Document to OpenAI Assistants API

   - First, ensure you have your FAQ document ready. This can be a text document, PDF, or other supported formats containing the frequently asked questions and answers.
   - Go to the **OpenAI Assistants API UI**. You can access the UI through the OpenAI platform at [OpenAI Assistants UI](https://platform.openai.com/).
   - In the Assistants UI, create a new assistant or select an existing one to upload your FAQ document.
   - Upload your document by using the **File Search** feature. This tool acts like a RAG (Retrieval-Augmented Generation) pipeline, enabling the model to search the document and generate responses based on it.
     - Follow the instructions to feed the FAQ document into the API. The assistant will index and make use of the information in the document for generating responses.
   
### 2. Retrieve the Assistant ID

   - After the document is uploaded, you need to retrieve the **Assistant ID**. This ID will be required to make API calls from your app.
   - In the Assistants UI, locate your assistant and copy its **Assistant ID** from the settings or overview page.
   
### 3. Configure the API in Your App

   - With the Assistant ID and OpenAI API Key in hand, go to your backend directory.
   - In the backend folder, create a `.env` file if one doesn’t exist already.
   - Add the following environment variables:
     ```bash
     REACT_APP_ASSISTANT_ID=<your_assistant_id>
     REACT_APP_OPENAI_API_KEY=<your_openai_api_key>
     ```
     - Replace `<your_assistant_id>` with the Assistant ID retrieved in step 2.
     - Replace `<your_openai_api_key>` with your personal API key, which can be generated from the [OpenAI API platform](https://platform.openai.com/).

### 4. Make API Calls to Retrieve Responses

   - With the assistant configured, you can now make calls to the GPT-4 OpenAI Assistants API to generate responses based on user queries.
   - The backend of your app will send the user’s query to the OpenAI API, and the assistant will retrieve an answer from the FAQ document.
 

By following these steps, you can successfully integrate your FAQ document into the GPT-4 Assistant API and enable your chatbot to answer user queries using the uploaded knowledge base.

