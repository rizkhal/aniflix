/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void;
  system: () => void;
  dark: () => void;
  light: () => void;
  toggle: (cb: Function) => void;
}

declare global {
  interface Window {
    sidebar: ElectronApi;
    electronAPI: ElectronApi;
    darkMode: ElectronApi;
  }
}
