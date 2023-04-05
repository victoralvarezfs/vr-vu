/*import jwt from "jsonwebtoken";

export default interface UserSession {
  userId: string;
  sessionId: string;
}

export class SessionManager {
  private sessions: { [key: string]: string } = {};
  private readonly secret: string = "";

  private generateToken(payload: any): string {
    return jwt.sign(payload, this.secret);
  }

  public addSession(sessionId: string, playbackId: string): void {
    const token = this.generateToken({ sessionId, playbackId });
    this.sessions[sessionId] = token;
  }

  public removeSession(sessionId: string): void {
    delete this.sessions[sessionId];
  }

  public getSessionPlaybackId(sessionId: string): string {
    const token = this.sessions[sessionId];
    if (token) {
      const decodedToken = jwt.verify(token, this.secret);
      return decodedToken.sub || '';
    } else {
      return "";
    }
  }

  public getNumSessions(): number {
    return Object.keys(this.sessions).length;
  }
}*/
export class SessionManager {}
