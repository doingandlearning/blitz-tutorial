import { SessionContext } from "blitz"
import db, { ChoiceDeleteArgs } from "db"

type DeleteChoiceInput = {
  where: ChoiceDeleteArgs["where"]
}

export default async function deleteChoice(
  { where }: DeleteChoiceInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const choice = await db.choice.delete({ where })

  return choice
}
