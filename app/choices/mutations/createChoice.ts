import { SessionContext } from "blitz"
import db, { ChoiceCreateArgs } from "db"

type CreateChoiceInput = {
  data: ChoiceCreateArgs["data"]
}
export default async function createChoice(
  { data }: CreateChoiceInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const choice = await db.choice.create({ data })

  return choice
}
