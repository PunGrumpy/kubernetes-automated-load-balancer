import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    projectId: 'y7wyq7',
    async setupNodeEvents(on, config) {}
  }
})
