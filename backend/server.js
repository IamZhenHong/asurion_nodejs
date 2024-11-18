require("dotenv").config();
const OpenAI = require('openai');
const express = require('express');
const { OPENAI_API_KEY, ASSISTANT_ID } = process.env;
const cors = require('cors');

const app = express();
app.use(cors());  // This allows all incoming requests from any origin

// Middleware to parse JSON bodies
app.use(express.json());

// Set up OpenAI Client
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    defaultHeaders: { "OpenAI-Beta": "assistants=v2" }
});

// Assistant can be created via API or UI
const assistantId = ASSISTANT_ID;
let pollingInterval;

// Set up a Thread
async function createThread() {
    console.log('Creating a new thread...');
    const thread = await openai.beta.threads.create();
    return thread;
}

// Add message to the thread
async function addMessage(threadId, message) {
    console.log('Adding a new message to thread: ' + threadId);
    const response = await openai.beta.threads.messages.create(
        threadId,
        {
            role: "user",
            content: message
        }
    );
    return response;
}

// Run the assistant for the thread
async function runAssistant(threadId) {
    console.log('Running assistant for thread: ' + threadId);
    const response = await openai.beta.threads.runs.create(
        threadId,
        { assistant_id: assistantId }
    );

    console.log(response);
    return response;
}

// Check the status of the assistant run
async function checkingStatus(res, threadId, runId) {
    const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);
    const status = runObject.status;
    console.log(runObject);
    console.log('Current status: ' + status);

    if (status === 'completed') {
        clearInterval(pollingInterval);

        const messagesList = await openai.beta.threads.messages.list(threadId);
        const messages = messagesList.body.data.map((message) => message.content);

        res.json({ messages });
    }
}

//=========================================================
//============== ROUTE SERVER =============================
//=========================================================

// Open a new thread
app.get('/thread', async (req, res) => {
    try {
        const thread = await createThread();
        res.json({ threadId: thread.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create thread' });
    }
});

// Post a message to a thread
app.post('/message', async (req, res) => {
    const { message, threadId } = req.body;
    try {
        // Add message to the thread
        await addMessage(threadId, message);

        // Run the assistant for the thread
        const run = await runAssistant(threadId);
        const runId = run.id;

        // Check the status periodically
        pollingInterval = setInterval(() => {
            checkingStatus(res, threadId, runId);
        }, 5000);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process message' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
