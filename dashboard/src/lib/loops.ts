// lib/loops.js
import { LoopsClient } from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export default loops;
