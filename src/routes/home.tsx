import { Hono } from 'hono'
import { Layout } from '../components/Layout'
import { HomePage } from '../components/HomePage'
import { getSettings } from '../utils/settings'

export const homeRoute = new Hono()

homeRoute.get('/', (c) => {
  const settings = getSettings(c);
  return c.html(
    <Layout>
      <HomePage settings={settings} />
    </Layout>
  )
})
