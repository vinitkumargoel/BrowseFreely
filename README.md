# BrowseFreely 🌐

A fast, modern, and lightweight web proxy/browser built with **Bun**, **Hono**, and **JSX**. Browse the web seamlessly with built-in ad-blocking, advanced anti-fingerprinting, and robust Single Page Application (SPA) support.

## ✨ Features

- 🚀 **Blazing Fast**: Built on [Bun](https://bun.sh/) and [Hono](https://hono.dev/) for incredibly fast server-side rendering and edge-ready execution.
- 🛡️ **Built-in Adblocker**: Integrates `@ghostery/adblocker` to automatically drop trackers, ads, and telemetry scripts natively, saving bandwidth and protecting your privacy.
- 👻 **Advanced Anti-Fingerprinting**:
  - **User-Agent Spoofing:** Select your desired device identity directly from the homepage.
  - **Canvas Spoofing:** Injects client-side scripts to invisibly alter Canvas API readouts, preventing trackers from fingerprinting your specific hardware.
  - **WebRTC Protection:** Blocks WebRTC IP leak loopholes on the client-side.
- 🍪 **Encrypted Session Jar**: Log into websites *through* the proxy! Cookies are intercepted, held securely in an in-memory session jar on the server, and automatically injected into subsequent requests without ever hitting your local machine.
- 📖 **Reader Mode (NoScript)**: Instantly strip all JavaScript from a proxied page for maximum speed, security, and easy reading.
- ⚡ **Asset Caching**: Includes a built-in LRU cache to serve repeated static assets (fonts, images) directly from memory, drastically reducing outbound bandwidth.
- 🧩 **SPA Compatibility**: Includes custom fetch interceptors and catch-all routing to support React, Next.js, and other modern Single Page Applications that typically break inside standard proxies.
- 🔒 **Security First**: Built-in SSRF (Server-Side Request Forgery) protection to prevent access to local and private IP addresses, plus active Rate Limiting.
- 💅 **Modern UI**: Clean, minimalistic, dark-mode native interface using server-rendered JSX.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Hono](https://hono.dev/)
- **Templating**: JSX (Server-side rendered)
- **Adblocker**: `@ghostery/adblocker`
- **Language**: TypeScript

## 📦 Installation & Setup

### Prerequisites
You need to have [Bun](https://bun.sh/) installed on your machine.

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/browsefreely.git
   cd browsefreely
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## 🚀 Production Deployment

BrowseFreely includes configuration for deploying with [PM2](https://pm2.keymetrics.io/).

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application in production mode:
   ```bash
   bun run pm2:start
   ```

3. Manage your deployment:
   ```bash
   bun run pm2:logs   # View live logs
   bun run pm2:stop   # Stop the server
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started. Have ideas? Check out our [ISSUES.md](ISSUES.md) roadmap!

Please also adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## ⚠️ Disclaimer

This project is created for educational and privacy-enhancing purposes. The maintainers of BrowseFreely are not responsible for any misuse of this software. Please do not use this tool to bypass legal restrictions, access illicit content, or violate the Terms of Service of target websites.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
