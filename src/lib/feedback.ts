// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store
const feedbackStore = new Map<string, any>();

export function storeFeedback(id: string, feedback: any) {
  feedbackStore.set(id, feedback);
}

export function getFeedback(id: string) {
  return feedbackStore.get(id);
} 