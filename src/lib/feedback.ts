// Store feedback in localStorage for persistence
export function storeFeedback(id: string, feedback: any) {
  try {
    // Get existing feedback
    const existingFeedback = localStorage.getItem('feedbackStore');
    const feedbackStore = existingFeedback ? JSON.parse(existingFeedback) : {};
    
    // Add new feedback
    feedbackStore[id] = feedback;
    
    // Save back to localStorage
    localStorage.setItem('feedbackStore', JSON.stringify(feedbackStore));
    
    // Also store in sessionStorage for immediate access
    sessionStorage.setItem('currentFeedback', JSON.stringify(feedback));
  } catch (error) {
    console.error('Error storing feedback:', error);
    // Fallback to sessionStorage only if localStorage fails
    sessionStorage.setItem('currentFeedback', JSON.stringify(feedback));
  }
}

export function getFeedback(id: string) {
  try {
    // Try to get from localStorage first
    const existingFeedback = localStorage.getItem('feedbackStore');
    if (existingFeedback) {
      const feedbackStore = JSON.parse(existingFeedback);
      if (feedbackStore[id]) {
        return feedbackStore[id];
      }
    }
    
    // Fallback to sessionStorage
    const currentFeedback = sessionStorage.getItem('currentFeedback');
    if (currentFeedback) {
      const feedback = JSON.parse(currentFeedback);
      if (feedback.feedbackId === id) {
        return feedback;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return null;
  }
} 