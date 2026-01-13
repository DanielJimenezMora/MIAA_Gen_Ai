import { generateItinerary } from './src/lib/ai-service';

async function test() {
  try {
    console.log("Testing generateItinerary...");
    const result = await generateItinerary({
      destination: "Paris",
      duration: 3,
      budget: "medio",
      interests: ["arte"],
      restrictions: ""
    });
    console.log("Result:", result);
  } catch (error) {
    console.error("CAUGHT ERROR:", error);
  }
}

test();
