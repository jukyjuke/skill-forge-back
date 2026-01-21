export interface ISocialService {
  followUser(followerId: string, followingId: string): Promise<void>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  getFollowers(userId: string): Promise<any[]>;
  getFollowing(userId: string): Promise<any[]>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getSocialFeed(userId: string, limit?: number): Promise<any[]>;
}
