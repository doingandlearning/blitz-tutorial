import { SessionContext } from "blitz"
import db, { QuestionDeleteArgs } from "db"

type DeleteQuestionInput = {
  where: QuestionDeleteArgs["where"]
}

export default async function deleteQuestion(
  { where }: DeleteQuestionInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  await db.choice.deleteMany({ where: { question: { id: where.id } } })
  const question = await db.question.delete({ where })

  return question
}
