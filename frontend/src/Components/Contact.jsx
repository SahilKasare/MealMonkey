import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full h-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold animate_animated animate_fadeIn">Inform us of Yourself</h2>
          <p className="text-gray-500 mt-2 animate_animated animatefadeIn animate_delay-1s">Contact us if you have any queries or merely want to say hi.</p>
        </div>
        
        <div className="flex justify-between gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg w-1/4 text-white flex items-center justify-start">
            <div className="bg-orange-400 p-4 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m0 8v2m0 4v2m0 4v2m-6-4v2m0-10v2m0-10V9m0 4v2m0-6v2m0 4v2m0-6v2" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-bold">Phone</p>
              <p>(+91) 9420305048</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg w-1/4 text-white flex items-center justify-start">
            <div className="bg-orange-400 p-4 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 00-4-4V4a8 8 0 00-8 8m4-4a4 4 0 104 4H4a8 8 0 008 8v-4a4 4 0 10-4-4m8 4a4 4 0 004-4H4a4 4 0 004 4h8" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-bold">Email</p>
              <p>mealmonkey@gmail.com</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg w-1/4 text-white flex items-center justify-start">
            <div className="bg-orange-400 p-4 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12H4a1 1 0 01-1-1V7a1 1 0 011-1h4V4a1 1 0 011-1h2a1 1 0 011 1v2h4a1 1 0 011 1v4a1 1 0 01-1 1h-4v4a1 1 0 01-1 1H9a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-bold">Main Office</p>
              <p>IIITS SriCity</p>
            </div>
          </div>
         
          <div className="bg-gray-800 p-6 rounded-lg w-1/4 text-white flex items-center justify-start">
            <div className="bg-orange-400 p-4 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 11h16m-5 4h5" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-bold">Mumbai Office</p>
              <p>D-Height Towers, Bandra</p>
            </div>
          </div>
        </div>

        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6 animate_animated animatefadeIn animate_delay-3s">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">First Name</label>
              <input type="text" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter First Name" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Last Name</label>
              <input type="text" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Last Name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate_animated animatefadeIn animate_delay-4s">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Email</label>
              <input type="email" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold">Phone Number</label>
              <input type="text" className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter Your Phone Number" />
            </div>
          </div>

          <div className="flex flex-col animate_animated animatefadeIn animate_delay-5s">
            <label className="text-gray-600 font-semibold">How Can We Help You?</label>
            <textarea className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-400" rows="4" placeholder="Let us know your message"></textarea>
          </div>

          <div className="flex justify-end space-x-4 animate_animated animatefadeIn animate_delay-6s">
            <button type="button" className="bg-gray-200 text-gray-600 p-3 rounded-md">CANCEL</button>
            <button type="submit" className="bg-orange-400 text-white p-3 rounded-md">SUBMIT</button>
          </div>
        </form>
      </div>

      
      <div className="bg-gray-800 w-full mt-10 p-6 text-white flex items-center justify-between rounded-lg h-auto animate_animated animatefadeIn animate_delay-7s">
        <p className="text-lg">Don't pass up our fantastic discounts. Get email offers from all of our best eateries.</p>
        <div className="flex">
          <input type="email" className="p-3 rounded-l-md bg-gray-700 border border-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter your Email" />
          <button className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-r-md">Subscribe Now</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;