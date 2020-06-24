import { createServer, request } from 'http';
import { read, readFile } from 'fs';
import { resolve } from 'path';
import { parse } from 'querystring';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';

const serve = createServer((req, res) => {
  switch (req.url) {
    case '/status': {
      res.writeHead(200, {
        Content_Type: 'application/json',
      });
      res.write(
        JSON.stringify({
          status: 'ok',
        })
      );
      res.end();
      break;
    }

    case '/authenticate': {
      let data = '';

      req.on('data', (chunck) => {
        data += chunck;
      });

      req.on('end', () => {
        const params = parse(data);

        res.writeHead(301, {
          Location: '/home',
        });
        res.end();
      });

      break;
    }

    case '/home': {
      const path = resolve(__dirname, './pages/home.html');

      readFile(path, (error, file) => {
        if (error) {
          res.writeHead(500, "Can't  process HTML file :'(.");
          res.end();
          return;
        }

        res.writeHead(200);
        res.write(file);
        res.end();
      });

      break;
    }

    case '/sign-in': {
      const path = resolve(__dirname, './pages/sign-in.html');

      readFile(path, (error, file) => {
        if (error) {
          res.writeHead(500, "Can't  process HTML file :'(.");
          res.end();
          return;
        }

        res.writeHead(200);
        res.write(file);
        res.end();
      });

      break;
    }

    default: {
      res.writeHead(404);
      res.write('Service not found');
      res.end();
      break;
    }
  }
});

serve.listen(PORT, '127.0.0.1', () => {
  console.log(`Ouvindo ${HOST_NAME}:${PORT}`);
});
