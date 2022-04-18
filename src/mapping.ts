import { BigInt } from "@graphprotocol/graph-ts"
import { Deposit,EmergencyWithdraw,Withdraw } from "../generated/minichef/minichef"
import { Users,TVL } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Users.load(event.params.user.toString())
  if (entity===null)
    entity = new Users(event.params.user.toString())
  entity.pid = event.params.pid
  const storeamount = entity.amount
  const amount =event.params.amount
  entity.amount = storeamount+amount
  entity.save()
  let total = TVL.load("1")
  if (total===null)
  total = new TVL("1")
  total.amount += event.params.amount
  total.save()
}
export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = Users.load(event.params.user.toString())
  if (entity===null)
    entity = new Users(event.params.user.toString())
  entity.pid = event.params.pid
  entity.amount -= event.params.amount
  entity.save()
  let total = TVL.load("1")
  if (total===null)
  total = new TVL("1")
  total.amount = -(event.params.amount)+total.amount
  total.save()
}

export function handleWithdraw(event: Withdraw): void {
  let entity = Users.load(event.params.user.toString())
  if (entity===null)
    entity = new Users(event.params.user.toString())
  entity.pid = event.params.pid
  entity.amount = -(event.params.amount)+entity.amount
  entity.save()
  let total = TVL.load("1")
  if (total===null)
  total = new TVL("1")
  total.amount = -(event.params.amount)+total.amount
  total.save()
}
