import { SessionContext } from "blitz"
import db, { FindManyQuestionArgs } from "db"

type GetQuestionsInput = {
  where?: FindManyQuestionArgs["where"]
  orderBy?: FindManyQuestionArgs["orderBy"]
  skip?: FindManyQuestionArgs["skip"]
  take?: FindManyQuestionArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyQuestionArgs['include']
}

export default async function getQuestions(
  { where, orderBy, skip = 0, take }: GetQuestionsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const questions = await db.question.findMany({
    where,
    orderBy,
    take,
    skip,
    include: { choices: true },
  })

  const count = await db.question.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    questions,
    nextPage,
    hasMore,
  }
}
