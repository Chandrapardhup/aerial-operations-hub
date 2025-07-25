
# Mission Planner Bridge Setup Documentation

This guide explains how to set up the Mission Planner Bridge service for secure application launching from your web interface.

## Overview

The Mission Planner Bridge is a local HTTP server that runs on your machine and provides secure access to launch Mission Planner. This approach ensures security while enabling web-based control and maintains compatibility with Mission Planner's WebSocket server on port 8080.

## Prerequisites

- Mission Planner installed at: `C:\Program Files (x86)\Mission Planner\MissionPlanner.exe`
- Node.js (version 14 or higher)
- Basic command line knowledge
- Administrator privileges for file system access

## Installation Steps

### 1. Create the Bridge Service

Create a new directory for the bridge service:

```bash
mkdir mission-planner-bridge
cd mission-planner-bridge
npm init -y
```

### 2. Install Dependencies

```bash
npm install express cors helmet child_process path fs
npm install --save-dev @types/node @types/express typescript ts-node
```

### 3. Create the Enhanced Server

Create `server.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { spawn, exec } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY || '';
const MISSION_PLANNER_PATH = 'C:\\Program Files (x86)\\Mission Planner\\MissionPlanner.exe';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your web app URLs
  credentials: true
}));
app.use(express.json());

// API Key middleware (if configured)
const authenticateApiKey = (req: any, res: any, next: any) => {
  if (API_KEY) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    missionPlannerPath: MISSION_PLANNER_PATH,
    pathExists: existsSync(MISSION_PLANNER_PATH)
  });
});

// Verify Mission Planner installation path
app.post('/verify/mission-planner-path', authenticateApiKey, (req, res) => {
  const { path: requestedPath } = req.body;
  const pathToCheck = requestedPath || MISSION_PLANNER_PATH;
  
  try {
    const exists = existsSync(pathToCheck);
    res.json({
      exists,
      path: pathToCheck,
      message: exists ? 'Path verified successfully' : 'Mission Planner executable not found at specified path'
    });
  } catch (error) {
    res.status(500).json({
      exists: false,
      path: pathToCheck,
      message: 'Error checking path: ' + (error instanceof Error ? error.message : 'Unknown error')
    });
  }
});

// Launch Mission Planner
app.post('/launch/mission-planner', authenticateApiKey, (req, res) => {
  try {
    if (!existsSync(MISSION_PLANNER_PATH)) {
      return res.status(404).json({
        success: false,
        message: `Mission Planner not found at: ${MISSION_PLANNER_PATH}. Please verify installation.`,
        path: MISSION_PLANNER_PATH
      });
    }

    const child = spawn(MISSION_PLANNER_PATH, [], {
      detached: true,
      stdio: 'ignore'
    });
    
    child.unref();
    
    res.json({
      success: true,
      message: 'Mission Planner launched successfully. WebSocket server will be available on port 8080.',
      processId: child.pid,
      path: MISSION_PLANNER_PATH,
      webSocketPort: 8080
    });

    console.log(`Mission Planner launched with PID: ${child.pid}`);
    
  } catch (error) {
    console.error('Launch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to launch Mission Planner: ' + (error instanceof Error ? error.message : 'Unknown error'),
      path: MISSION_PLANNER_PATH
    });
  }
});

// Check Mission Planner status with WebSocket readiness
app.get('/status/mission-planner', authenticateApiKey, (req, res) => {
  exec('tasklist /FI "IMAGENAME eq MissionPlanner.exe"', (error, stdout, stderr) => {
    if (error) {
      res.json({ 
        isRunning: false,
        webSocketReady: false
      });
      return;
    }
    
    const isRunning = stdout.includes('MissionPlanner.exe');
    
    // If running, check if WebSocket port 8080 is accessible
    if (isRunning) {
      exec('netstat -an | findstr :8080', (wsError, wsStdout) => {
        const webSocketReady = !wsError && wsStdout.includes(':8080');
        res.json({ 
          isRunning,
          webSocketReady,
          webSocketPort: 8080
        });
      });
    } else {
      res.json({ 
        isRunning: false,
        webSocketReady: false
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mission Planner Bridge running on port ${PORT}`);
  console.log(`Mission Planner path: ${MISSION_PLANNER_PATH}`);
  console.log(`Path exists: ${existsSync(MISSION_PLANNER_PATH)}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
```

### 4. Create package.json Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "start": "node dist/server.js",
    "dev": "ts-node server.ts",
    "build": "tsc server.ts --outDir dist"
  }
}
```

### 5. Set Environment Variables (Optional)

Create `.env` file:

```
PORT=3001
API_KEY=your-secure-api-key-here
MISSION_PLANNER_PATH=C:\Path\To\Your\MissionPlanner.exe
```

### 6. Start the Service

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Windows Service Setup (Optional)

To run the bridge as a Windows service:

1. Install `node-windows`:
```bash
npm install -g node-windows
```

2. Create service installer script `install-service.js`:
```javascript
const Service = require('node-windows').Service;

const svc = new Service({
  name: 'Mission Planner Bridge',
  description: 'HTTP bridge for Mission Planner control',
  script: require('path').join(__dirname, 'dist/server.js')
});

svc.on('install', () => {
  svc.start();
});

svc.install();
```

3. Run as administrator:
```bash
node install-service.js
```

## Security Considerations

1. **API Key**: Always use an API key in production
2. **CORS**: Configure CORS to only allow your web application domains
3. **Firewall**: Ensure the bridge port is not exposed to external networks
4. **HTTPS**: Consider using HTTPS for the bridge in production environments

## Configuration in Web Application

In your web application's local server setup:

1. Set the correct host (usually `localhost`)
2. Set the correct port (default: `3001`)
3. Add your API key if configured
4. Test the connection before launching

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT environment variable
2. **Mission Planner not found**: Set the correct path in environment variables
3. **CORS errors**: Ensure your web app domain is in the CORS configuration
4. **Permission denied**: Run as administrator if needed

### Testing the Bridge

Test endpoints manually:

```bash
# Health check
curl http://localhost:3001/health

# Launch Mission Planner (with API key)
curl -X POST http://localhost:3001/launch/mission-planner \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json"

# Check status
curl http://localhost:3001/status/mission-planner \
  -H "Authorization: Bearer your-api-key"
```

## Support

For issues or questions:
1. Check the bridge service logs
2. Verify Mission Planner installation path
3. Test network connectivity between web app and bridge
4. Review firewall and antivirus settings
