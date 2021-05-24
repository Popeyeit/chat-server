link server - https://popeye-chat.herokuapp.com/

base url https://popeye-chat.herokuapp.com/api

*********USER*********

User model {
email: {
    type: String,  
    
    required: true,  
    
    unique: true,  
    
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  token: {
    type: String,
    required: false,
    default: null,
  },
  status: {
    type: String,
    required: true,
    default: 'online',
  },
}

Routers:

  - POST '/register',{email,password,name}
  - POST '/login'
  - POST '/logout'
  - GET '/currentUser'
  - GET '/users' -- get all users


*********ROOM*********

Room Model {
  name: {
    type: String,
    required: true,
  },
  lastMessage: {
    type: String,
    require: false,
  },
};

Routers:

- GET '/rooms' -- get all rooms
- GET '/rooms/:roomId' -- get room by id
- POST '/rooms/new,{name}' -- create new room
- PATCH '/rooms/change/:roomId,{lastMessage}' -- changer last message in the room


*********MESSAGES*********

Message Model {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
};

Routers:

- POST "/messages,{message,roomId}"
- GET "/message/:userId" -- get all message of user
