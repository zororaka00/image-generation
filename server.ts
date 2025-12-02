import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import IdCard from './src/IdCard.tsx';
import nodeHtmlToImage from 'node-html-to-image';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get('/:todosId.png', async (req: Request, res: Response) => {
  try {
    const { todosId } = req.params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todosId}`);
    const data = await response.json() as Todo;

    const componentHtml = ReactDOMServer.renderToString(React.createElement(IdCard, { todo: data }));

    const image = await nodeHtmlToImage({
      html: `<html><head><style>body { width: 1200px; height: 630px; margin: 0; }</style></head><body>${componentHtml}</body></html>`,
       puppeteerArgs: { args: ['--no-sandbox'] }
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// This needs to be built first, so we'll just serve a placeholder for now
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET' && !req.path.endsWith('.png')) {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  } else {
    next();
  }
});

app.listen(5173, () => {
  console.log('Server is listening on http://localhost:5173');
});
