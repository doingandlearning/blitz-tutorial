import { SessionContext } from "blitz"
import db, { FindManyChoiceArgs } from "db"

type GetChoicesInput = {
  where?: FindManyChoiceArgs["where"]
  orderBy?: FindManyChoiceArgs["orderBy"]
  skip?: FindManyChoiceArgs["skip"]
  take?: FindManyChoiceArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyChoiceArgs['include']
}

export default async function getChoices(
  { where, orderBy, skip = 0, take }: GetChoicesInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const choices = await db.choice.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.choice.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    choices,
    nextPage,
    hasMore,
  }
}
