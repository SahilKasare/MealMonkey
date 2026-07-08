import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const features = [
  { title: 'Easiest Way To Order', text: 'Order your favourite meals in just a few taps — quick, simple and hassle-free.' },
  { title: 'Easy Refund Policies', text: 'Our refund policies are designed to be transparent, fair and hassle-free.' },
  { title: 'Free Fast Deliveries', text: 'Piping-hot food delivered to your door quickly, with no hidden charges.' },
  { title: 'Premium Options', text: 'Enjoy priority access, special discounts and more. Elevate your experience today!' },
];

const team = [
  { name: 'Hrishikesh Dongre', id: 'S20220010083', img: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/529/small_2x/indian-man-with-crossed-arms-wearing-a-formal-shirt-ai-generated-photo.jpg' },
  { name: 'Sahil Suresh Kasare', id: 'S20220010191', img: 'https://www.shutterstock.com/image-photo/young-bearded-confident-successful-man-600nw-1926860225.jpg' },
  { name: 'Yadnyesh Badgujar', id: 'S20220010247', img: 'https://cdn.growtha.dev/656b574d4c3db5a4d0ef52fa/66c6145b59b86daec15b47c4_adinaaba%20(5).jpg' },
  { name: 'Padmanabham Nithin Sai', id: 'S20220010158', img: 'https://img.freepik.com/premium-photo/successful-entrepreneur-ai-portrait_236854-41599.jpg' },
  { name: 'N. Dheeraj Sathvik', id: 'S20220010148', img: 'https://i.pinimg.com/736x/f4/ad/e0/f4ade01b3f193f937e92db33dfa5d3be.jpg' },
];

const AVATAR_FALLBACK =
  'https://ui-avatars.com/api/?background=f97316&color=fff&size=128&name=';

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">What is MealMonkey?</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            MealMonkey is a food ordering and delivery platform that connects you with the
            best restaurants around you. Browse menus, discover new cuisines, track your
            orders in real time and enjoy your favourite meals from the comfort of your
            home — all with easy navigation, secure payments and fast delivery.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <img src="https://img.freepik.com/premium-photo/chef-preparing-food-kitchen-restaurant_777271-3996.jpg" alt="Chefs preparing food" className="rounded-lg shadow-lg w-full h-full object-cover" />
            <div className="grid grid-cols-2 gap-4">
              <img src="https://media.istockphoto.com/id/1287186696/photo/food-delivery-app-order-with-phone-online-mobile-service-for-take-away-burger-and-pizza.jpg?s=612x612&w=0&k=20&c=s0g33OOVOT9nZiFat2wvo7HhRvmM5kx0CJBp1OSfbRE=" alt="Food delivery app" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <img src="https://media.istockphoto.com/id/1137764161/photo/close-up-of-delivery-man-handing-a-slack-of-foam-lunch-box.jpg?s=612x612&w=0&k=20&c=KzKxQSkLMlyEnAVrPxIjpBVAh-swM6-fZyszzYTpId0=" alt="Delivery partner" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <img src="https://images.pexels.com/photos/175753/pexels-photo-175753.jpeg?cs=srgb&dl=pexels-conojeghuo-175753.jpg&fm=jpg" alt="Cooking" className="rounded-lg shadow-lg w-full h-full object-cover" />
              <img src="https://www.foodandwine.com/thmb/RDbEUfRZxbXq0gl_Hle_MqOxu-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/faw-primary-gift-baskets-dburreson-001-2a514142001d484d8cf7da9255e0d320.jpg" alt="Food baskets" className="rounded-lg shadow-lg w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group p-6 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
                <h3 className="text-lg font-semibold group-hover:text-white transition">{f.title}</h3>
                <p className="text-gray-600 mt-2 group-hover:text-white/90 transition">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Our team is committed to delivering innovative solutions that meet the needs of our clients and users.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member) => (
              <div key={member.id} className="group text-center p-4 bg-white shadow-lg hover:bg-orange-500 transition rounded-lg">
                <img
                  src={member.img}
                  alt={member.name}
                  onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK + encodeURIComponent(member.name); }}
                  className="rounded-full w-28 h-28 mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold group-hover:text-white transition">{member.name}</h3>
                <p className="text-gray-600 group-hover:text-white/90 transition">{member.id}</p>
                <div className="flex justify-center space-x-3 mt-3 text-gray-500 group-hover:text-white transition">
                  <FaTwitter className="cursor-pointer hover:scale-110 transition" />
                  <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
                  <FaInstagram className="cursor-pointer hover:scale-110 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
