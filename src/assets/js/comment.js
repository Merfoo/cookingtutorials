import { firebase, database } from '@/assets/js/firebase/index';

export default {
  create(comment, recipeKey) {
    return new Promise((resolveCreate, rejectCreate) => {
      const ref = database.ref();
      let commentKey = null;

      const createSuccessHandler = () => {
        resolveCreate();
      };

      const createErrorHandler = (error) => {
        if (commentKey) {
          ref.child(`recipeComments/${recipeKey}/${commentKey}`).remove();
          ref.child(`userComments/${comment.userId}/${commentKey}`).remove();
        }

        rejectCreate(error);
      };

      ref.child(`userComments/${comment.userId}`).push({ recipeKey }).then((data) => {
        commentKey = data.key;

        ref.child(`recipeComments/${recipeKey}/${commentKey}`).set({
          userId: comment.userId,
          username: comment.username,
          content: comment.content,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        }).then(createSuccessHandler, createErrorHandler);
      }, createErrorHandler);
    });
  },
  get(recipeKey, commentKey) {
    return new Promise((resolve, reject) => {
      database.ref().child(`recipeComments/${recipeKey}/${commentKey}`).once('value').then((commentData) => {
        resolve(commentData.val());
      }, (error) => {
        reject(error);
      });
    });
  },
};
