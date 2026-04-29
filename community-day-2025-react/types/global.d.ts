declare global {
  interface Window {
    __initialSectionRestore?: {
      hash: string;
      shouldRestore: boolean;
      completed: boolean;
    };
    dataLayer?: unknown[];
    AOS?: { init: (options: Record<string, unknown>) => void };
    jQuery?: unknown;
    $?: unknown;
  }
}

export {};
