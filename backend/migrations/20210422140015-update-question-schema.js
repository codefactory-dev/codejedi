module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('questions').updateMany({}, {$set: {submissionIds: []}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('questions').updateMany({},{$unset: {submissionIds: 1}},{upsert: false, multi: true})
  }
};
