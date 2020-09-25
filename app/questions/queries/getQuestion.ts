import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneQuestionArgs } from "db"

type GetQuestionInput = {
  where: FindOneQuestionArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneQuestionArgs['include']
}

export default async function getQuestion(
  { where /* include */ }: GetQuestionInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const question = await db.question.findOne({ where, include: { choices: true } })

  if (!question) throw new NotFoundError()

  return question
}
