/** Feedback statuses for ui elements like toasts, messages, and inputs */
export type FeedbackStatus = 'error' | 'success' | 'warn' | 'info'

export type FeedbackStatusProps<Status extends FeedbackStatus> = {
  /** Feedback status that controls accent and border colors */
  status?: Status
}