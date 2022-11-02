function problem7(user, friends, visitors) {
  const friendPoint = getFriendPoint(user, friends)
  const visitPoint = getVisitPoint(user, friends, visitors)
  const recommendPoint = friendPoint

  for (let visitor of Object.keys(visitPoint)) {
      if (recommendPoint[visitor]) recommendPoint[visitor] += visitPoint[visitor]
      else recommendPoint[visitor] = visitPoint[visitor]
  }

  const sortedRecommend = Object.keys(recommendPoint).sort((a, b) => {
      if (recommendPoint[a] === recommendPoint[b]) return a < b ? -1 : a > b ? 1 : 0
      return recommendPoint[b] - recommendPoint[a]
  })

  return sortedRecommend.length > 5 ? sortedRecommend.slice(0, 5) : sortedRecommend
}

function getVisitPoint(user, friends, visitors) {
  const visitorsExceptFriend = getVisitorsExceptFriend(user, friends, visitors)
  const visitPoint = {}
  for (let visitor of visitorsExceptFriend) {
    visitPoint[visitor] ? visitPoint[visitor] += 1 : visitPoint[visitor] = 1
  }
  return visitPoint
}

function getVisitorsExceptFriend(user, friends, visitors) {
  const visitorsExceptFriend = []
  const userFriend = checkFriendship(user, friends)
  const friendList = {}
  userFriend.forEach((friend) => {
    friendList[friend] = "friend"
  })
  visitors.forEach((visitor) => {
    if (!friendList[visitor]) visitorsExceptFriend.push(visitor)
  })
  return visitorsExceptFriend
}

function getFriendPoint(user, friends) {
  const userFriend = checkFriendship(user, friends)
  const friendsExceptUser = exceptUser(user, friends)
  let friendPoint = {}
  userFriend.forEach((friend) => {
      checkFriendship(friend, friendsExceptUser).forEach((person) => {
        friendPoint[person] ? friendPoint[person] += 10 : friendPoint[person] = 10
      })
  })
  userFriend.forEach((userFriend) => {
    if (friendPoint[userFriend]) delete friendPoint[userFriend]
  })
  return friendPoint
}

function checkFriendship(person, friends) {
  let friendOfPerson = []
  friends.forEach((friendship) => {
    if (friendship[0] === person) friendOfPerson.push(friendship[1])
    if (friendship[1] === person) friendOfPerson.push(friendship[0])
  })
  return friendOfPerson
}

function exceptUser(user, friends) {
  let friendsExceptUser = []
  friends.forEach((friendship) => {
      if (friendship[0] !== user && friendship[1] !== user) friendsExceptUser.push(friendship)
  })
  return friendsExceptUser
}

module.exports = problem7;
