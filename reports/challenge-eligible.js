// Find all users who completed the To-Dos in a given Challenge

var challengeId = 'ed2b5be9-121b-45d3-ae81-445139699930';

var userCursor = db.users.find({'challenges':{$in:[challengeId]}},{'_id':1, 'profile.name':1});

print('UUID,Profile Name,To-Dos Complete');

while (userCursor.hasNext()) {
	var user = userCursor.next();
  var taskCount = 0;
  var taskCompletedCount = 0;
  var taskCursor = db.tasks.find({'userId': user._id, 'challenge.id': challengeId, 'type': 'todo'}, {'completed':1});

  while (taskCursor.hasNext()) {
    var task = taskCursor.next();

    taskCount++;
    if (task.completed) taskCompletedCount++;
  }

  if (taskCompletedCount === taskCount) {
    print(user._id + ',' + user.profile.name + ',' + 'Yes');
  } else {
    print(user._id + ',' + user.profile.name + ',' + 'No');
  }
}
