import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneChoiceArgs } from "db"

type GetChoiceInput = {
  where: FindOneChoiceArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneChoiceArgs['include']
}

export default async function getChoice(
  { where /* include */ }: GetChoiceInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const choice = await db.choice.findOne({ where })

  if (!choice) throw new NotFoundError()

  return choice
}
