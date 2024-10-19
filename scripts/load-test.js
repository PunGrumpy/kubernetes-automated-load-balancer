import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 users over 30 seconds
    { duration: '1m', target: 10 }, // Stay at 10 users for 1 minute
    { duration: '30s', target: 0 } // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'] // 95% of requests should be below 500ms
  }
}

export default function () {
  const url = 'https://pungrumpy.xyz'
  const params = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  }
  http.get(url, params)
  sleep(1)
}
