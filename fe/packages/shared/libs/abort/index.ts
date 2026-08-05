export const ABORT_ERROR = new Error("Operation was aborted");

export const initAbort = () => {
  let abortController: AbortController | null = null;

  return {
    reassignController: () => {
      abortController?.abort(ABORT_ERROR);
      abortController = new AbortController();

      return abortController.signal;
    },
  };
};
