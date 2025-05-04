const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">What is MealMonkey?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to our online order website! Here, you can browse our wide selection of products and place orders from the comfort of your own home. Whether you're looking for groceries, electronics, or gifts, we have you covered. With easy navigation, secure payment options, and fast delivery. We strive to make your online shopping experience as seamless as possible. Explore our website today and discover the convenience of ordering online! So why wait? Start shopping on our online order website and experience the ultimate convenience of online shopping!
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div>
              <img src="https://img.freepik.com/premium-photo/chef-preparing-food-kitchen-restaurant_777271-3996.jpg" alt="Chefs" className="rounded-lg shadow-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://media.istockphoto.com/id/1287186696/photo/food-delivery-app-order-with-phone-online-mobile-service-for-take-away-burger-and-pizza.jpg?s=612x612&w=0&k=20&c=s0g33OOVOT9nZiFat2wvo7HhRvmM5kx0CJBp1OSfbRE=" alt="Shopping App" className="rounded-lg shadow-lg" />
              <img src="https://media.istockphoto.com/id/1137764161/photo/close-up-of-delivery-man-handing-a-slack-of-foam-lunch-box.jpg?s=612x612&w=0&k=20&c=KzKxQSkLMlyEnAVrPxIjpBVAh-swM6-fZyszzYTpId0=" alt="Delivery" className="rounded-lg shadow-lg" />
              <img src="https://images.pexels.com/photos/175753/pexels-photo-175753.jpeg?cs=srgb&dl=pexels-conojeghuo-175753.jpg&fm=jpg" alt="Cooking" className="rounded-lg shadow-lg" />
              <img src="https://www.foodandwine.com/thmb/RDbEUfRZxbXq0gl_Hle_MqOxu-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/faw-primary-gift-baskets-dburreson-001-2a514142001d484d8cf7da9255e0d320.jpg" alt="Gifts" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-4 gap-6">
            <div className="relative p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <h3 className="text-lg font-semibold">Easiest Way To Order</h3>
              <p className="text-gray-600">We have designed our refund policies to be easy and hassle-free.</p>
            </div>
            <div className="relative p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <h3 className="text-lg font-semibold">Easy Refund Policies</h3>
              <p className="text-gray-600">With our commitment to speedy delivery and no additional cost to you.</p>
            </div>
            <div className="relative p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <h3 className="text-lg font-semibold">Free Fast Deliveries</h3>
              <p className="text-gray-600">Enjoy priority access, special discounts, and more. Elevate your experience today!</p>
            </div>
            <div className="relative p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <h3 className="text-lg font-semibold">Premium Options</h3>
              <p className="text-gray-600">You only need to follow a few steps & the tasty food is next to your home.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 mb-10">
            Our team is committed to delivering innovative solutions that meet the needs of our clients and users.
          </p>

          <div className="grid grid-cols-5 gap-6">
            <div className="text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/028/287/529/small_2x/indian-man-with-crossed-arms-wearing-a-formal-shirt-ai-generated-photo.jpg" alt="Harriet Watson" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Hrishikesh Dongre</h3>
              <p className="text-gray-600">S20220010083</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <img src="https://www.shutterstock.com/image-photo/young-bearded-confident-successful-man-600nw-1926860225.jpg" alt="Jenifer Peters" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Sahil Suresh Kasare</h3>
              <p className="text-gray-600">S20220010191</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <img src="https://cdn.growtha.dev/656b574d4c3db5a4d0ef52fa/66c6145b59b86daec15b47c4_adinaaba%20(5).jpg" alt="Rock Smith" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Yadnyesh Badgujar</h3>
              <p className="text-gray-600">S20220010247</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <img src="https://img.freepik.com/premium-photo/successful-entrepreneur-ai-portrait_236854-41599.jpg" alt="Johnson Clarke" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Padmanabham Nithin Sai</h3>
              <p className="text-gray-600">S20220010158</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>

            <div className="text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
              <img src="https://i.pinimg.com/736x/f4/ad/e0/f4ade01b3f193f937e92db33dfa5d3be.jpg" alt="Christina Jones" className="rounded-full w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">N.Dheeraj sathvik</h3>
              <p className="text-gray-600">S20220010148</p>
              <div className="flex justify-center space-x-2 mt-2">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;