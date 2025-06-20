
interface MissionPlannerConnection {
  isConnected: boolean;
  connectionType: 'TCP' | 'UDP' | 'Serial' | 'MAVLink';
  host?: string;
  port?: number;
  baudRate?: number;
  comPort?: string;
}

interface MAVLinkMessage {
  msgid: number;
  target_system: number;
  target_component: number;
  payload: any;
}

class MissionPlannerService {
  private connection: MissionPlannerConnection | null = null;
  private websocket: WebSocket | null = null;
  private eventListeners: Map<string, Function[]> = new Map();

  async connect(connectionConfig: {
    type: 'TCP' | 'UDP' | 'Serial';
    host?: string;
    port?: number;
    comPort?: string;
    baudRate?: number;
  }): Promise<boolean> {
    try {
      // For web-based connection, we'll use a WebSocket proxy to Mission Planner
      // Mission Planner can expose a WebSocket interface on port 8080 by default
      const wsUrl = `ws://${connectionConfig.host || 'localhost'}:${connectionConfig.port || 8080}`;
      
      this.websocket = new WebSocket(wsUrl);
      
      return new Promise((resolve, reject) => {
        if (!this.websocket) {
          reject(new Error('WebSocket not initialized'));
          return;
        }

        this.websocket.onopen = () => {
          this.connection = {
            isConnected: true,
            connectionType: connectionConfig.type,
            host: connectionConfig.host,
            port: connectionConfig.port
          };
          this.emit('connected', this.connection);
          resolve(true);
        };

        this.websocket.onerror = (error) => {
          console.error('Mission Planner connection error:', error);
          this.emit('error', error);
          reject(error);
        };

        this.websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMissionPlannerMessage(data);
          } catch (error) {
            console.error('Error parsing Mission Planner message:', error);
          }
        };

        this.websocket.onclose = () => {
          this.connection = null;
          this.emit('disconnected');
        };

        // Timeout after 10 seconds
        setTimeout(() => {
          if (!this.connection?.isConnected) {
            reject(new Error('Connection timeout'));
          }
        }, 10000);
      });
    } catch (error) {
      console.error('Failed to connect to Mission Planner:', error);
      throw error;
    }
  }

  disconnect(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    this.connection = null;
    this.emit('disconnected');
  }

  isConnected(): boolean {
    return this.connection?.isConnected || false;
  }

  async sendCommand(command: string, params?: any): Promise<void> {
    if (!this.isConnected() || !this.websocket) {
      throw new Error('Not connected to Mission Planner');
    }

    const message = {
      type: 'command',
      command,
      params,
      timestamp: Date.now()
    };

    this.websocket.send(JSON.stringify(message));
  }

  async sendMAVLinkCommand(msgType: string, targetSystem: number, targetComponent: number, params: any): Promise<void> {
    if (!this.isConnected()) {
      throw new Error('Not connected to Mission Planner');
    }

    const mavlinkMessage: MAVLinkMessage = {
      msgid: this.getMAVLinkMessageId(msgType),
      target_system: targetSystem,
      target_component: targetComponent,
      payload: params
    };

    await this.sendCommand('mavlink', mavlinkMessage);
  }

  private getMAVLinkMessageId(msgType: string): number {
    const messageIds: { [key: string]: number } = {
      'COMMAND_LONG': 76,
      'SET_MODE': 11,
      'ARM_DISARM': 400,
      'TAKEOFF': 22,
      'LAND': 21,
      'RETURN_TO_LAUNCH': 20
    };
    return messageIds[msgType] || 0;
  }

  private handleMissionPlannerMessage(data: any): void {
    switch (data.type) {
      case 'telemetry':
        this.emit('telemetry', data.payload);
        break;
      case 'status':
        this.emit('status', data.payload);
        break;
      case 'heartbeat':
        this.emit('heartbeat', data.payload);
        break;
      case 'error':
        this.emit('error', data.payload);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }
}

export const missionPlannerService = new MissionPlannerService();
export type { MissionPlannerConnection, MAVLinkMessage };
