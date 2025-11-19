# Travel Blog Frontend

Static website for personal travel blog with visitor counter.

## Features

- ✅ Responsive design
- ✅ Visitor counter with real-time updates
- ✅ Deployed to Azure Storage static website
- ✅ Azure CDN for global performance
- ✅ Custom domain support

## Architecture
https://travelblogswiss.z1.web.core.windows.net
↓
Azure Storage Static Website (HTML/CSS/JS)
↓
Calls → Azure Function API → Cosmos DB


## Deployment

Automatically deployed via GitHub Actions on push to main.

## Local Development

Open `index.html` in a web browser or use a local server:

```bash
python -m http.server 8000

