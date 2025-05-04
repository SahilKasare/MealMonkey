import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = {
    home: ["Classic", "Elegance", "Compact", "Minimal", "Modern"],
    order: [
      "Menu Listing",
      "Menu Grid",
      "Address",
      "Checkout",
      "Confirm Order",
      "Offer",
      "Order Tracking",
      "Payment",
      "Restaurant Listing",
    ],
    blog: [
      "Grid Left Sidebar",
      "Grid Right Sidebar",
      "Blog Listening",
      "Blog Details",
    ],
    pages: [
      "404",
      "Coming Soon",
      "Contact",
      "Empty Cart",
      "FAQ",
      "OTP",
      "Sign In",
      "Signup",
      "Testimonial",
      "Wishlist",
    ],
  };

  const faqData = [
    {
      id: 1,
      question: "I want to track my order",
      answer:
        "To track your order, you will need to have the tracking number or order ID provided by the seller or shipping carrier. Once you have this information, you can usually track your order online by visiting the carrier's website and entering the tracking number or order ID in the designated tracking field.",
    },
    {
      id: 2,
      question: "I want to manage my order",
      answer:
        "Check your order confirmation email or account: This should contain information about your order, including the expected delivery date, tracking number (if applicable), and contact information for the seller. Contact the seller: If you have any questions about your order or need to make changes, the best way to do so is to contact the seller directly. You can typically find their contact information on their website or in your order confirmation email. Check the order status: Many online retailers provide a way for you to check the status of your order online. This can give you information about when your order was shipped, when it's expected to arrive, and any tracking information. Make changes to your order: Depending on the seller's policies, you may be able to make changes to your order, such as adding or removing items, changing the shipping address, or canceling the order altogether. Contact the seller to see if this is possible.",
    },
    {
      id: 3,
      question: "I did not receive Instant Cashback",
      answer:
        "I'm sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.\n1. What type of purchase did you make?\n2. From which website or store did you make the purchase?\n3. Did you receive any confirmation or receipt for your purchase?\n4. Did you check the terms and conditions of the cashback offer before making the purchase?\n5. Have you contacted the website or store's customer support regarding the issue?",
    },
    {
      id: 4,
      question: "I am unable to pay using wallet",
      answer:
        "I'm sorry to hear that you're having trouble paying with your wallet. Here are some steps to troubleshoot:\n1. Check your wallet balance\n2. Ensure your wallet is properly linked\n3. Verify any daily transaction limits\n4. Check for any system maintenance or outages\n5. Contact customer support for assistance",
    },
    {
      id: 5,
      question: "I want help with returns & refunds",
      answer:
        "For returns and refunds, please follow these steps:\n1. Check the return eligibility period\n2. Ensure the item meets return conditions\n3. Initiate return through your account\n4. Pack the item securely with original packaging\n5. Ship using provided return label\n6. Refund will be processed once item is received",
    },
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-interrogation-point-and-answers-helpful-information-q-a-whoooa-solid-1-pack-people-illustrations-3779152.png"
              alt="FAQ illustration"
              className="max-w-md"
            />
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="border rounded-lg bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${
                      openQuestion === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openQuestion === faq.id
                      ? "max-h-96 py-4"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FAQ;