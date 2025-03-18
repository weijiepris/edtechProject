// src/tailwind.ts
import { create } from 'twrnc';

// Create a Tailwind instance
const tw = create(require('./tailwind.config.js'));

// Export globally
export default tw;
