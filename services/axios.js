import axios from 'axios';

import { parse, stringify } from 'qs';

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  Headers: { 'Content-Type': 'application/json' },
  paramSerializer: {
    encode: parse,
    serialize: stringify,
  },
});
