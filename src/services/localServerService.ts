
interface LocalServerConfig {
  host: string;
  port: number;
  apiKey?: string;
}

interface LaunchResponse {
  success: boolean;
  message: string;
  processId?: number;
}

class LocalServerService {
  private config: LocalServerConfig;
  private isServerRunning: boolean = false;

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
          missionPlannerPath: 'C:\\Users\\chand\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Mission Planner\\Mission Planner.lnk'
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result: LaunchResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to launch Mission Planner via local server:', error);
      throw error;
    }
  }

  // Direct launch method that bypasses server for immediate launch
  async launchMissionPlannerDirect(): Promise<LaunchResponse> {
    try {
      // Try to use the file protocol to open the .lnk file directly
      const missionPlannerPath = 'C:\\Users\\chand\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Mission Planner\\Mission Planner.lnk';
      
      // Create a temporary link element to trigger the file opening
      const link = document.createElement('a');
      link.href = `file:///${missionPlannerPath}`;
      link.click();
      
      return {
        success: true,
        message: 'Mission Planner launch initiated',
        processId: Date.now()
      };
    } catch (error) {
      console.error('Direct launch failed:', error);
      throw new Error('Failed to launch Mission Planner directly');
    }
  }

  async getMissionPlannerStatus(): Promise<{ isRunning: boolean; processId?: number }> {
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

  updateConfig(newConfig: Partial<LocalServerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  isLocalServerRunning(): boolean {
    return this.isServerRunning;
  }
}

export const localServerService = new LocalServerService();
export type { LocalServerConfig, LaunchResponse };
