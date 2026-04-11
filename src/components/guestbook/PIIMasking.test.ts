import { describe, expect, it } from "bun:test";

describe("PII Masking - ReDoS Prevention", () => {
  // Replicate the blurPII function from GuestbookForm
  const blurPII = (text: string) => {
    // Email masking - simple pattern with no catastrophic backtracking
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    let result = text.replace(emailRegex, "[email hidden]");

    // Phone masking - simplified regex to prevent ReDoS
    const phoneRegex =
      /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}[-.\s]?\d{2,4}/g;
    result = result.replace(phoneRegex, "[contact hidden]");

    // Additional catch-all for long digit sequences (likely phone numbers)
    const digitSequenceRegex = /\b\d{10,15}\b/g;
    result = result.replace(digitSequenceRegex, "[contact hidden]");

    return result;
  };

  describe("Phone Number Detection", () => {
    it("should mask Indonesian phone numbers", () => {
      const phoneNumbers = [
        "Call me at 081234567890",
        "My number: +62 812 3456 7890",
        "Contact: +62-812-3456-7890",
        "WA: 0812-3456-7890",
      ];

      for (const text of phoneNumbers) {
        const result = blurPII(text);
        expect(result).toContain("[contact hidden]");
        expect(result).not.toMatch(/\d{10,}/);
      }
    });

    it("should mask international phone numbers", () => {
      const phoneNumbers = [
        "US: +1-555-123-4567",
        "Call (555) 123-4567",
        "Number: 555.123.4567",
      ];

      for (const text of phoneNumbers) {
        const result = blurPII(text);
        expect(result).toContain("[contact hidden]");
      }

      // UK format with spaces (may not match all patterns - that's OK)
      // The digit sequence catch-all will handle 10+ digit sequences
      const ukFormat = "UK: +44 20 7946 0958";
      const ukResult = blurPII(ukFormat);
      // Either the full number or the digit sequence should be masked
      expect(
        ukResult.includes("[contact hidden]") ||
          !ukResult.includes("7946 0958"),
      ).toBe(true);
    });

    it("should mask plain digit sequences (10-15 digits)", () => {
      const sequences = [
        "My number is 081234567890",
        "Call 6281234567890 now",
        "Contact: 1234567890123",
      ];

      for (const text of sequences) {
        const result = blurPII(text);
        expect(result).toContain("[contact hidden]");
        expect(result).not.toMatch(/\b\d{10,15}\b/);
      }
    });

    it("should preserve non-phone text", () => {
      const safeTexts = [
        "I have 3 cats",
        "The year is 2024",
        "Room number 42",
        "Price: $50",
        "My ID is 12345", // Less than 10 digits
      ];

      for (const text of safeTexts) {
        const result = blurPII(text);
        expect(result).toBe(text);
      }
    });
  });

  describe("Email Detection", () => {
    it("should mask email addresses", () => {
      const emails = [
        "Contact: user@example.com",
        "Email: john.doe@company.co.id",
        "Send to: test+label@domain.org",
      ];

      for (const text of emails) {
        const result = blurPII(text);
        expect(result).toContain("[email hidden]");
        expect(result).not.toMatch(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        );
      }
    });

    it("should preserve text with @ symbol but not email", () => {
      const safeTexts = [
        "I'm @username on Twitter",
        "Use @mention feature",
        "Score is 50@50",
      ];

      for (const text of safeTexts) {
        const result = blurPII(text);
        expect(result).toBe(text);
      }
    });
  });

  describe("ReDoS Resistance", () => {
    it("should handle malicious phone-like patterns quickly", () => {
      const maliciousInputs = [
        // Repeated separators
        "1" + "- ".repeat(30) + "1",
        "1" + " - ".repeat(30) + "1",
        // Ambiguous digit patterns
        "9" + "9-9".repeat(25),
        // Long mixed separators
        "1- 2- 3- 4- 5- 6- 7- 8- 9- 0- 1- 2- 3- 4- 5- 6- 7- 8- 9- 0- 1- 2- 3- 4- 5- 6",
        // Repeated optional group triggers
        "+1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1",
      ];

      for (const input of maliciousInputs) {
        const start = Date.now();
        blurPII(input);
        const duration = Date.now() - start;

        // Should complete in under 50ms (ReDoS would take seconds or hang)
        expect(duration).toBeLessThan(50);
      }
    });

    it("should handle malicious email-like patterns quickly", () => {
      const maliciousInputs = [
        // Repeated dots before @
        "user" + ".".repeat(50) + "@domain.com",
        // Repeated @ symbols
        "user" + "@".repeat(20) + "domain.com",
        // Long local parts
        "a".repeat(100) + "@domain.com",
        // Nested patterns
        "a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z@domain.com",
      ];

      for (const input of maliciousInputs) {
        const start = Date.now();
        blurPII(input);
        const duration = Date.now() - start;

        expect(duration).toBeLessThan(50);
      }
    });

    it("should handle very long inputs efficiently", () => {
      const veryLongText =
        "Hello ".repeat(500) + "081234567890" + " world ".repeat(500);
      const start = Date.now();
      blurPII(veryLongText);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100);
      expect(veryLongText.length).toBeGreaterThan(5000);
    });

    it("should maintain consistent performance across input sizes", () => {
      const sizes = [100, 500, 1000];
      const durations: number[] = [];

      for (const size of sizes) {
        const input = "1-2-3-4-5-6-7-8-9-0".repeat(size / 20);
        const start = Date.now();
        blurPII(input);
        durations.push(Date.now() - start);
      }

      // Performance should scale reasonably (not exponentially)
      // Allow up to 50x ratio for very small timing differences
      for (let i = 1; i < durations.length; i++) {
        if (durations[i - 1] > 0 && durations[i] > 0) {
          const ratio = durations[i] / durations[i - 1];
          expect(ratio).toBeLessThan(50);
        }
      }

      // Most importantly, all should complete under 100ms
      for (const duration of durations) {
        expect(duration).toBeLessThan(100);
      }
    });
  });

  describe("Mixed PII", () => {
    it("should mask both email and phone in same text", () => {
      const mixedContent = [
        "Contact: john@example.com or 081234567890",
        "Email user@domain.com or call (555) 123-4567",
        "Reach me at +62-812-3456-7890 or test@company.co.id",
      ];

      for (const text of mixedContent) {
        const result = blurPII(text);
        expect(result).toContain("[email hidden]");
        expect(result).toContain("[contact hidden]");
      }
    });

    it("should handle multiple PII instances", () => {
      const text =
        "Call 081234567890 or 081234567891, email a@b.com or c@d.com";
      const result = blurPII(text);

      // Should mask all instances
      const phoneMatches = result.match(/\[contact hidden\]/g);
      const emailMatches = result.match(/\[email hidden\]/g);

      expect(phoneMatches?.length).toBeGreaterThanOrEqual(2);
      expect(emailMatches?.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      expect(blurPII("")).toBe("");
    });

    it("should handle whitespace-only strings", () => {
      expect(blurPII("   \n\t   ")).toBe("   \n\t   ");
    });

    it("should handle Unicode text", () => {
      const text = "Hubungi saya di 081234567890 📱";
      const result = blurPII(text);
      expect(result).toContain("[contact hidden]");
      expect(result).toContain("📱");
    });

    it("should handle multiline text", () => {
      const text = `Line 1 with email: user@example.com
Line 2 with phone: 081234567890
Line 3 is clean
Line 4 with both: test@domain.org and +62-812-3456-7890`;

      const result = blurPII(text);
      expect(result).toContain("[email hidden]");
      expect(result).toContain("[contact hidden]");
      expect(result).toContain("Line 3 is clean"); // Preserve clean lines
    });
  });
});
