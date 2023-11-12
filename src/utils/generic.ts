export const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Unable to copy to clipboard.", err);
    throw err;
  }
};

export const generateId = () => crypto.randomUUID();

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
