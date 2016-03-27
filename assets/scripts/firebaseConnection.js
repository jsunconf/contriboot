const FIREBASE_IO_URL = 'https://contriboot-2016.firebaseio.com';
export const FIREBASE_CONTRIBUTIONS = `${FIREBASE_IO_URL}/contributions`;
export const FIREBASE_INTERESTS = `${FIREBASE_IO_URL}/interests`;

let firebaseContributions = null;

function getFirebaseReference() {
  if (!firebaseContributions) {
    firebaseContributions = new Firebase(FIREBASE_CONTRIBUTIONS);
  }
  return firebaseContributions;
}

export const contributionFirebase = {
  reference: getFirebaseReference(),
  hasAuthentication: getFirebaseReference().getAuth() !== null
};
