import { BASE_URL } from '@services/api/api.config';
import { createServer, Response } from 'miragejs';
import {
  urlInitService,
} from '../services/api/endpoints';

export default function makeServer() {
  let server = createServer({
    routes() {
      this.namespace = BASE_URL;
      this.post(urlInitService, (_schema, request) => {
        const code = JSON.parse(request.requestBody)['code'];
        if (code)
          return new Response(
            200,
            {},
            {
              preferred_username: 'Dav',
              access_token: 'lorem.ipsum.docet',
              lookup: ['hash', 'domain', 'ip', 'url'],
              admin: ['monitoring'],
            },
          );
        console.log('301');
        return new Response(
          200,
          {},
          {
            preferred_username: 'Dav',
            access_token: 'lorem.ipsum.docet',
            lookup: ['hash', 'domain', 'ip', 'url'],
            admin: ['monitoring'],
          },
        );
      });
    },
  });
  return server;
}
