
interface LocalServerConfig {
  host: string;
  port: number;
  apiKey?: string;
}

interface LaunchResponse {
  success: boolean;
  message: string;
  processId?: number;
  path?: string;
}

class LocalServerService {
  private config: LocalServerConfig;
  private isServerRunning: boolean = false;
  private readonly MISSION_PLANNER_PATH = 'C:\\Program Files (x86)\\Mission Planner\\MissionPlanner.exe';

  constructor(config: LocalServerConfig = { host: 'localhost', port: 3001 }) {
    this.config = config;
  }

  async checkServerStatus(): Promise<boolean> {
    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });
      
      this.isServerRunning = response.ok;
      return this.isServerRunning;
    } catch (error) {
      console.error('Local server not accessible:', error);
      this.isServerRunning = false;
      return false;
    }
  }

  async launchMissionPlanner(): Promise<LaunchResponse> {
    if (!this.isServerRunning) {
      const serverRunning = await this.checkServerStatus();
      if (!serverRunning) {
        throw new Error('Local server is not running. Please start the Mission Planner Bridge service.');
      }
    }

    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/launch/mission-planner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          source: 'mission-control-web',
          missionPlannerPath: this.MISSION_PLANNER_PATH,
          expectedWebSocketPort: 8080
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
        throw new Error(`Server responded with status ${response.status}: ${errorData.message || 'Launch failed'}`);
      }

      const result: LaunchResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to launch Mission Planner via local server:', error);
      throw error;
    }
  }

  async verifyMissionPlannerPath(): Promise<{ exists: boolean; path: string; message: string }> {
    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/verify/mission-planner-path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: JSON.stringify({
          path: this.MISSION_PLANNER_PATH
        })
      });

      if (!response.ok) {
        return {
          exists: false,
          path: this.MISSION_PLANNER_PATH,
          message: 'Unable to verify path - server not responding'
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to verify Mission Planner path:', error);
      return {
        exists: false,
        path: this.MISSION_PLANNER_PATH,
        message: 'Unable to verify path - connection failed'
      };
    }
  }

  async getMissionPlannerStatus(): Promise<{ isRunning: boolean; processId?: number; webSocketReady?: boolean }> {
    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/status/mission-planner`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      if (!response.ok) {
        return { isRunning: false };
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get Mission Planner status:', error);
      return { isRunning: false };
    }
  }

  getMissionPlannerPath(): string {
    return this.MISSION_PLANNER_PATH;
  }

  updateConfig(newConfig: Partial<LocalServerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  isLocalServerRunning(): boolean {
    return this.isServerRunning;
  }
}

export const localServerService = new LocalServerService();
export type { LocalServerConfig, LaunchResponse };
