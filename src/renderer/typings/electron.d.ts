/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronAPI {
  system: () => void;
  dark: () => void;
  light: () => void;
  toggle: (cb: Function) => void;
  setProxy: (setting: any) => void;
  getProxy: () => Promise<string>;
}

interface DevLog {
  sendMessage: (message: string) => void;
}

declare global {
  interface Window {
    setting: ElectronAPI;
    logger: DevLog;
  }
}
