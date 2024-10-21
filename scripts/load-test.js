import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '10s', target: 50 }, // Ramp-up to 50 users over 10s (50 users per second)
    { duration: '20s', target: 100 }, // Peak at 100 users for 20s (5 users per second)
    { duration: '10s', target: 0 } // Ramp-down to 0 users over 10s (10 users per second)
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms
    http_req_failed: ['rate<0.01'] // Less than 1% of requests should fail
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

  let res = http.get(url, params)

  // Check if request was successful
  check(res, {
    'status is 200': r => r.status === 200,
    'response time below 500ms': r => r.timings.duration < 500
  })

  sleep(1)
}
