export interface EventStream {
  image: String;
  id: String;
  title: String;
  price: Number;
  date?: Date;
  streamKey: String;
  playbackId: String;
  playback360Id?: String[];
  status: String;
  is360: Boolean;
  createdAt: Date;
  updatedAt: Date;
  UserId: String;
  CategoryId: Number;
  User: User;
  Ratings?: RatingCheck[];
  Tags?: Tag[];
  avgRating?: Number;
  playbackLink: String;
}

export interface User {
  avatar: String;
  coverPhoto?: String;
  id: String;
  firstName: String;
  lastName: String;
  username?: String;
  displayName?: String;
  email: String;
  phone: String;
  password: String;
  passcode?: String;
  passcodeExpiry?: Date;
  passwordExpiry?: Date;
  passwordResetToken?: String;
  deviceId?: String;
  notificationStatus: Boolean;
  aboutDescription?: String;
  links?: String;
  avgRating?: String;
  stripeCreatorAccountId?: String;
  stripeCustomerId?: String;
  stripeCustomerBankToken?: String;
  createdAt: Date;
  updatedAt: Date;
  roleId: Number;
  Subscribers?: Subscriber[];
  Subscriptions?: Subscription[];
  Streams: Stream[];
}

export interface Subscriber {
  id: String;
  firstName: String;
  lastName: String;
}

export interface Subscription {
  id: String;
  firstName: String;
  lastName: String;
}

export interface Stream {
  image: String;
  title: String;
  id: String;
  price: Number;
  playbackId: String;
  status: String;
  date?: Date;
  streamKey: String;
  UserId: String;
}

export interface RatingCheck {
  firstName: String;
  lastName: String;
  rating: Rating;
}

export interface Rating {
  rating: Number;
  createdAt: Date;
  updatedAt: Date;
  UserId: String;
  StreamId: String;
}

export interface Tag {
  id: Number;
  name: String;
  createdAt: Date;
  updatedAt: Date;
}
