# DesiVibe AI: Sentiment-Driven Media Orchestration Infrastructure
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-v4.19%2B-blue.svg)](https://expressjs.com/)

DesiVibe AI is a production-grade, full-stack application engineered to translate unstructured, natural language linguistic inputs into contextualized, deep-linked Bollywood media streams. This repository houses the core two-tier server architecture designed to enforce strict zero-trust credential isolation, alongside the middleware pipelines built to transform non-deterministic conversational generative models into reliable, structured data engines.

---

## 🔒 Architectural Design & Security Framework

Direct frontend-to-LLM client runtimes expose sensitive enterprise cloud authentication tokens to malicious network extraction and extraction scripts. DesiVibe AI completely mitigates this vulnerability vector by utilizing a **Zero-Trust Backend Proxy Isolation Pattern**:

1. **Decoupled Architecture:** The client web UI is completely blind to upstream cloud infrastructure endpoints.
2. **Encapsulated Middleware:** Client requests target a localized Express proxy endpoint `/api/get-vibe`. 
3. **Cryptographic Isolation:** The proxy server intercepts payloads, injects administrative prompt parameters, and executes asynchronous outbound TLSv1.3 handshakes using environment variables hosted strictly within server-side process memory (`GEMINI_API_KEY`).
