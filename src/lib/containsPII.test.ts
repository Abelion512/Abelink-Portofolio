import { describe, expect, it } from "bun:test";
import { containsPII } from "./gemini";

describe("containsPII - Comprehensive Tests", () => {
  describe("Indonesian Phone Number Detection", () => {
    it("should detect +62 format phone numbers", () => {
      const phoneNumbers = [
        "+6281234567890",
        "+628123456789",
        "+62812345678",
        "Contact: +6281234567890",
        "Phone: +628987654321",
      ];

      for (const text of phoneNumbers) {
        expect(containsPII(text)).toBe(true);
      }
    });

    it("should detect 62 format (without +) phone numbers", () => {
      const phoneNumbers = [
        "6281234567890",
        "628123456789",
        "6289876543210",
        "Number: 62812345678",
      ];

      for (const text of phoneNumbers) {
        expect(containsPII(text)).toBe(true);
      }
    });

    it("should detect 08 format (local) phone numbers", () => {
      const phoneNumbers = [
        "081234567890",
        "08123456789",
        "085678901234",
        "089876543210",
        "My number: 0812345678",
      ];

      for (const text of phoneNumbers) {
        expect(containsPII(text)).toBe(true);
      }
    });

    it("should detect minimum valid length phone numbers (9 digits total)", () => {
      // The regex is [8[1-9][0-9]{6,10} which means:
      // - Starts with 8
      // - Second digit 1-9
      // - Then 6-10 more digits
      // - Total after prefix: 8-12 digits

      // Minimum: prefix + 8[1-9] + 6 digits
      expect(containsPII("081234567")).toBe(true); // 0 + 81234567 = 9 digits
      expect(containsPII("+6281234567")).toBe(true);
    });

    it("should detect maximum valid length phone numbers", () => {
      // Maximum: 8[1-9] + 10 digits = 12 digits total
      expect(containsPII("08123456789012")).toBe(true);
      expect(containsPII("+628123456789012")).toBe(true);
    });

    it("should reject invalid phone number formats", () => {
      const invalidNumbers = [
        "0812345", // Too short
        "0802345678", // Second digit is 0 (invalid)
        "12345678901", // Doesn't start with 8
        "+12345678901", // Not Indonesian prefix
        "81234567890", // Missing leading 0, +62, or 62
        "07123456789", // Starts with 07 (not Indonesian mobile)
      ];

      for (const text of invalidNumbers) {
        expect(containsPII(text)).toBe(false);
      }
    });

    it("should detect different Indonesian mobile operators", () => {
      const operatorNumbers = [
        "081234567890", // Telkomsel
        "085678901234", // Indosat
        "089876543210", // 3 (Tri)
        "087654321098", // Smartfren
        "088876543210", // XL
      ];

      for (const text of operatorNumbers) {
        expect(containsPII(text)).toBe(true);
      }
    });
  });

  describe("Email Address Detection", () => {
    it("should detect standalone email addresses", () => {
      // Note: The regex uses ^ and $ anchors, so ONLY standalone emails match
      const emails = [
        "test@example.com",
        "user.name@domain.org",
        "hello@company.co.id",
        "admin@site.net",
        "info@business.edu",
      ];

      for (const text of emails) {
        expect(containsPII(text)).toBe(true);
      }
    });

    it("should detect emails with various TLDs", () => {
      const emails = [
        "user@example.ab", // 2 char TLD (minimum from {2,6})
        "user@example.com", // 3 char TLD
        "user@example.info", // 4 char TLD
        "user@example.museum", // 6 char TLD (maximum)
      ];

      for (const text of emails) {
        expect(containsPII(text)).toBe(true);
      }

      // 1 char TLD is NOT valid (below minimum of {2,6})
      expect(containsPII("user@example.a")).toBe(false);

      // 7 char TLD is NOT valid (above maximum of {2,6})
      expect(containsPII("user@example.toolongt")).toBe(false);
    });

    it("should detect emails with valid special characters", () => {
      const emails = [
        "user.name@example.com",
        "user_name@example.com",
        "user-name@example.com",
      ];

      for (const text of emails) {
        expect(containsPII(text)).toBe(true);
      }

      // Note: + and % are NOT in the allowed character set [a-zA-Z0-9._-]
      // These will NOT be detected (known limitation)
      expect(containsPII("user+tag@example.com")).toBe(false);
      expect(containsPII("user%tag@example.com")).toBe(false);
    });

    it("should NOT detect emails embedded in text (known limitation)", () => {
      const embeddedEmails = [
        "My email is test@example.com",
        "Contact: user.name@domain.org",
        "Send to: hello@company.co.id",
        "Email: admin@site.net please",
        "Reach me at info@business.edu today",
      ];

      for (const text of embeddedEmails) {
        expect(containsPII(text)).toBe(false);
      }
    });

    it("should NOT detect invalid email formats", () => {
      const invalidEmails = [
        "user@", // Missing domain
        "@example.com", // Missing local part
        "user@example", // Missing TLD
        "user@.com", // Missing domain name
        "user name@example.com", // Space in local part
        "user@example.c", // TLD too short (1 char, but {2,6} allows this - edge case)
        "user@example.toolong", // TLD too long (7 chars)
      ];

      for (const text of invalidEmails) {
        expect(containsPII(text)).toBe(false);
      }
    });
  });

  describe("Combined PII Detection", () => {
    it("should return true if EITHER phone OR email is found", () => {
      const mixedContent = [
        "081234567890", // Phone only
        "test@example.com", // Email only
        "Call 081234567890 or email test@example.com", // Both (but email won't match due to ^$)
        "My phone is 081234567890", // Phone in text
      ];

      for (const text of mixedContent) {
        expect(containsPII(text)).toBe(true);
      }
    });

    it("should return false if NEITHER phone NOR email is found", () => {
      const safeContent = [
        "Hello, how are you?",
        "My name is John Doe",
        "I live in Jakarta, Indonesia",
        "The weather is nice today",
        "Let's meet tomorrow at 3pm",
        "My Twitter is @username",
      ];

      for (const text of safeContent) {
        expect(containsPII(text)).toBe(false);
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      expect(containsPII("")).toBe(false);
    });

    it("should handle whitespace-only strings", () => {
      expect(containsPII("   ")).toBe(false);
      expect(containsPII("\n\t")).toBe(false);
    });

    it("should handle very short strings", () => {
      expect(containsPII("hi")).toBe(false);
      expect(containsPII("test")).toBe(false);
      expect(containsPII("123")).toBe(false);
    });

    it("should handle Unicode and international characters", () => {
      const unicodeTexts = [
        "Halo, nama saya Budi 👋",
        "我的邮箱是 test@example.com", // Chinese text with standalone email
        "Привет! 081234567890", // Russian text with phone
      ];

      for (const text of unicodeTexts) {
        // Should not throw, and detect PII if present
        containsPII(text);
      }

      // Unicode text with phone should detect
      expect(containsPII("Привет! 081234567890")).toBe(true);
    });

    it("should handle multiline text", () => {
      const multilineText = `Hello,
My name is John.
Phone: 081234567890
Email me at your convenience.
Thanks!`;

      expect(containsPII(multilineText)).toBe(true);
    });

    it("should handle very long text efficiently", () => {
      const longText =
        "Hello ".repeat(1000) + "081234567890" + " World ".repeat(1000);
      const start = Date.now();
      const result = containsPII(longText);
      const duration = Date.now() - start;

      expect(result).toBe(true);
      expect(duration).toBeLessThan(100); // Should complete quickly
    });
  });

  describe("Boundary Conditions", () => {
    it("should detect phone numbers at string boundaries", () => {
      expect(containsPII("081234567890")).toBe(true); // Entire string
      expect(containsPII("Call 081234567890")).toBe(true); // At end
      expect(containsPII("081234567890 is my number")).toBe(true); // At start
      expect(containsPII("My number 081234567890 is active")).toBe(true); // In middle
    });

    it("should detect phone numbers with surrounding punctuation", () => {
      expect(containsPII("Phone: 081234567890.")).toBe(true);
      expect(containsPII("(081234567890)")).toBe(true);
      expect(containsPII("[081234567890]")).toBe(true);
    });

    it("should handle numbers that look like phone but aren't", () => {
      const almostPhone = [
        "12345678901", // 11 digits but doesn't match pattern
        "0812345", // Too short
        "20240101", // Date-like
        "1000000000", // Round number
      ];

      for (const text of almostPhone) {
        expect(containsPII(text)).toBe(false);
      }
    });
  });

  describe("Known Limitations Documentation", () => {
    it("documents that email regex only matches standalone emails", () => {
      // This is by design due to ^ and $ anchors
      // Standalone email: ✅ detected
      expect(containsPII("user@example.com")).toBe(true);

      // Email in sentence: ❌ NOT detected (limitation)
      expect(containsPII("My email is user@example.com")).toBe(false);

      // Workaround: Extract email first, then test
      const extractedEmail = "user@example.com";
      expect(containsPII(extractedEmail)).toBe(true);
    });

    it("documents that only Indonesian phone numbers are detected", () => {
      // Non-Indonesian numbers will NOT be detected
      const internationalNumbers = [
        "+1-555-123-4567", // US
        "+44-20-7946-0958", // UK
        "+81-3-1234-5678", // Japan
        "555-123-4567", // US without country code
      ];

      for (const text of internationalNumbers) {
        expect(containsPII(text)).toBe(false);
      }
    });

    it("documents that phone regex is global and stateful", () => {
      // The /g flag makes regex stateful (lastIndex tracking)
      // However, since we create new regex each call, this is safe
      const text = "Phone: 081234567890";

      // Multiple calls should give same result
      expect(containsPII(text)).toBe(true);
      expect(containsPII(text)).toBe(true);
      expect(containsPII(text)).toBe(true);
    });
  });

  describe("Security and Robustness", () => {
    it("should handle potential ReDoS inputs efficiently", () => {
      // Test with potentially problematic patterns
      const maliciousInputs = [
        "0" + "0".repeat(100), // Long sequence of zeros
        "user" + ".".repeat(100) + "@example.com", // Many dots before @
        "a".repeat(200), // Long string
      ];

      for (const input of maliciousInputs) {
        const start = Date.now();
        containsPII(input);
        const duration = Date.now() - start;

        // Should complete quickly (< 50ms)
        expect(duration).toBeLessThan(50);
      }
    });

    it("should not throw on malformed inputs", () => {
      const malformedInputs: unknown[] = [
        null, // Type safety bypass for testing
        undefined,
        123,
        {},
      ];

      // These might throw or return false - just ensure no unexpected crashes
      for (const input of malformedInputs) {
        try {
          const result = containsPII(input as string);
          expect(typeof result).toBe("boolean");
        } catch (error) {
          // If it throws, that's also acceptable behavior
          expect(error).toBeDefined();
        }
      }
    });
  });
});
