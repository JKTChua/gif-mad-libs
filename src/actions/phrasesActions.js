export const UPDATE_USER = 'phrases:updatePhrase';

export function updatePhrases(phrase) {
  return {
    type: UPDATE_USER,
    payload: {
      phrase,
    },
  };
}