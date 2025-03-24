import request from "supertest";
import app from "../server.js"; // Ensure app is exported in your server file

describe("Assignment API Tests", () => {
  it("should create an assignment", async () => {
    const res = await request(app).post("/api/assignments").send({
      name: "Test Assignment",
      folder: "folder_id",
      questions: [
        { questionText: "What is AI?", options: ["A", "B", "C"], correctAnswer: 2 }
      ]
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Assignment");
  });

  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/api/assignments").send({});
    expect(res.status).toBe(400);
  });

  it("should fetch assignments", async () => {
    const res = await request(app).get("/api/assignments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
