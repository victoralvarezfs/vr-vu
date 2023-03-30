import express, { Request, Response } from "express";
import axios from "axios";
import Hls from "hls.js";
import UserSession, { SessionManager } from "../interfaces/Session";
import { EventStream } from "../interfaces/Stream";

// Adds new session
//sessionManager.addSession(sessionId, playbackId);

// Removes existing session
//sessionManager.removeSession(sessionId);

// Gets session reproduction Id
//const playbackId = sessionManager.getSessionPlaybackId(sessionId);

// Get amount of total active sessions
//const numSessions = sessionManager.getNumSessions();

export class Server {
  private app: express.Application;
  private sessionManager: SessionManager;

  private videoSrc: string = "https://stream.mux.com/";
  private extension: string = ".m3u8";

  constructor(sessionManager: SessionManager) {
    this.app = express();
    this.sessionManager = sessionManager;
    this.setupEndpoints();
  }

  private setupEndpoints() {
    this.app.post("/api/session", (req: Request, res: Response) => {
      const { userId, playbackId } = req.body;
      const sessionId = this.sessionManager.addSession(userId, playbackId);
      res.json({ sessionId });
    });
    this.app.delete(
      "/api/session/:sessionId",
      (req: Request, res: Response) => {
        const { sessionId } = req.params;
        this.sessionManager.removeSession(sessionId);
        res.sendStatus(204);
      }
    );
    this.app.get(
      "/api/video/:playbackId/viewers",
      (req: Request, res: Response) => {
        const { playbackId } = req.params;
        const numViewers = this.sessionManager.getNumSessions();
        res.json({ numViewers });
      }
    );
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
