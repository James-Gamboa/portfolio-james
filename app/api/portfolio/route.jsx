import fs from "fs";
import { join } from "path";

const portfolioData = join(process.cwd(), "utils/data/portfolio.json");

export async function POST(req) {
  if (process.env.NODE_ENV === "development") {
    try {
      const body = await req.json();
      fs.writeFileSync(portfolioData, JSON.stringify(body), "utf-8");
      return new Response(
        JSON.stringify({ message: "Data saved successfully" }),
        {
          status: 200,
        }
      );
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to save data" }), {
        status: 500,
      });
    }
  } else {
    return new Response(
      JSON.stringify({ error: "This route works in development mode only" }),
      {
        status: 403,
      }
    );
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: "This is the GET response" }), {
    status: 200,
  });
}
