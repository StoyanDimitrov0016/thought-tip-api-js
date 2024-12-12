import { startSession } from "mongoose";

export const transactionContainer = async (asyncFunction) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const result = await asyncFunction(session);
    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
