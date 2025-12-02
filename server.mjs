import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import IdCard from './src/IdCard.tsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get('/:todosId.png', async (req, res) => {
  try {
    const { todosId } = req.params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todosId}`);
    const data = await response.json();

    const componentHtml = ReactDOMServer.renderToString(React.createElement(IdCard, { todo: data }));

    const html = `
      <html>
        <head>
          <title>Todo ${data.id}</title>
          <meta property="og:title" content="Todo ${data.id}" />
          <meta property="og:description" content="${data.title}" />
          <meta property="og:image" content="http://localhost:5173/${todosId}.png" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Todo ${data.id}" />
          <meta name="twitter:description" content="${data.title}" />
          <meta name="twitter:image" content="http://localhost:5173/${todosId}.png" />
        </head>
        <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f4f4;">
          ${componentHtml}
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// This needs to be built first, so we'll just serve a placeholder for now
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.endsWith('.png')) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  } else {
    next();
  }
});

app.listen(5173, () => {
  console.log('Server is listening on http://localhost:5173');
});
