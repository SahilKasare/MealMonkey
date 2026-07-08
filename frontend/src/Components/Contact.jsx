import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const infoCards = [
  { icon: FaPhoneAlt, label: 'Phone', value: '(+91) 9420305048' },
  { icon: FaEnvelope, label: 'Email', value: 'mealmonkey@gmail.com' },
  { icon: FaBuilding, label: 'Main Office', value: 'IIITS SriCity' },
  { icon: FaMapMarkerAlt, label: 'Mumbai Office', value: 'D-Height Towers, Bandra' },
];

const ContactForm = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const handleCancel = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="text-gray-500 mt-2">Contact us if you have any queries or merely want to say hi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {infoCards.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-gray-800 p-5 rounded-lg text-white flex items-center gap-3">
              <div className="bg-orange-400 p-3 rounded-full flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold">{label}</p>
                <p className="text-sm truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {submitted && (
          <div className="mb-6 bg-green-100 text-green-700 border border-green-200 rounded-md px-4 py-3 text-center">
            Thanks for reaching out! We&apos;ll get back to you shortly.
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">First Name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} required type="text" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter First Name" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Last Name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} type="text" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Last Name" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Email</label>
              <input name="email" value={form.email} onChange={onChange} required type="email" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-1">Phone Number</label>
              <input name="phone" value={form.phone} onChange={onChange} type="tel" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Your Phone Number" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-semibold mb-1">How Can We Help You?</label>
            <textarea name="message" value={form.message} onChange={onChange} required className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-400" rows="4" placeholder="Let us know your message"></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={handleCancel} className="bg-gray-200 text-gray-600 px-5 py-3 rounded-md hover:bg-gray-300 transition">CANCEL</button>
            <button type="submit" className="bg-orange-500 text-white px-5 py-3 rounded-md hover:bg-orange-600 transition">SUBMIT</button>
          </div>
        </form>
      </div>

      <div className="bg-gray-800 w-full max-w-6xl mt-10 p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 rounded-lg">
        <p className="text-lg text-center md:text-left">Don&apos;t pass up our fantastic discounts. Get email offers from all of our best eateries.</p>
        <div className="flex w-full md:w-auto">
          <input type="email" className="flex-1 md:flex-none p-3 rounded-l-md bg-gray-700 border border-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter your Email" />
          <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-r-md whitespace-nowrap">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
