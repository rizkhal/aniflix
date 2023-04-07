export * from "./api";

export const ucfirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const wait = (seconds: number): Promise<void> => {
  return new Promise((resolve: any) => setTimeout(resolve, seconds));
};

export function debounce(func: CallableFunction, delay: number) {
  let timeoutId: number;

  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
