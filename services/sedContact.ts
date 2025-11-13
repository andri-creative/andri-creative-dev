export interface createServices {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

class ContactService {
  async sendContactForm(data: createServices): Promise<ContactResponse> {
    try {
      const res = await fetch(
        "https://backend-ts-lemon.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return await res.json();
    } catch (error) {
      console.error("Error sending contact form:", error);
      throw error;
    }
  }
}

export const contactService = new ContactService();

export default contactService;
