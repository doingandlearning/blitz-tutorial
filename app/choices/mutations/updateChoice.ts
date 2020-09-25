import { SessionContext } from "blitz"
import db, { ChoiceUpdateArgs } from "db"

type UpdateChoiceInput = {
  where: ChoiceUpdateArgs["where"]
  data: ChoiceUpdateArgs["data"]
}

export default async function updateChoice(
  { where, data }: UpdateChoiceInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const choice = await db.choice.update({ where, data })

  return choice
}
