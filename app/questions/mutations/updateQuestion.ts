import { SessionContext } from "blitz"
import db, { QuestionUpdateArgs } from "db"

type UpdateQuestionInput = {
  where: QuestionUpdateArgs["where"]
  data: QuestionUpdateArgs["data"]
}

export default async function updateQuestion(
  { where, data }: UpdateQuestionInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const question = await db.question.update({ where, data })

  return question
}
