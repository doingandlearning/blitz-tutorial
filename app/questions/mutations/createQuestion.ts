import { SessionContext } from "blitz"
import db, { QuestionCreateArgs } from "db"

type CreateQuestionInput = {
  data: QuestionCreateArgs["data"]
}
export default async function createQuestion(
  { data }: CreateQuestionInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const question = await db.question.create({ data })

  return question
}
