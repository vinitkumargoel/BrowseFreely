# PM2 Production Setup

Since this project uses Bun, PM2 needs to be configured to use the `bun` interpreter instead of the default `node` interpreter.

1. Ensure PM2 is installed globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application in production mode using the ecosystem file:
   ```bash
   pm2 start ecosystem.config.js
   ```

3. Useful PM2 commands:
   - View logs: `pm2 logs browsefreely`
   - Monitor performance: `pm2 monit`
   - Restart the app: `pm2 restart browsefreely`
   - Stop the app: `pm2 stop browsefreely`
