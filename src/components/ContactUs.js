import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div
          className="sm:h-96 h-56 w-full"
          style={{
            background: "linear-gradient(150deg, #00dffe, #f7f4ef)",
          }}
        >
          <div className="lg:w-5/12 p-10 sm:w-3/4  md:w-3/5 ">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-left uppercase drop-shadow-lg">
              Get in touch
            </h1>
            <p className="text-lg md:text-2xl text-white text-left mt-6 drop-shadow-md">
              Want to get in touch? We'd love to hear from you. Here's how you
              can reach us!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="lg:h-56">
          <div className="flex w-full items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 md:mx-20 lg:absolute">
              {/* Talk to Us Card */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 text-center grid place-content-center place-items-center gap-3"
              >
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/online-support.png"
                  alt="online-support"
                />
                <h2 className="text-xl font-bold">Talk to Us</h2>
                <p className="text-gray-600">
                  Contact us directly by phone to get assistance and support.
                  Our friendly and knowledgeable team is available to answer
                  your questions, provide guidance, and address any concerns you
                  may have.
                </p>
                <button className="bg-accent text-white px-4 py-2 rounded-full hover:bg-accent-dark">
                  Call Now
                </button>
              </motion.div>

              {/* Customer Service Card */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-8 text-center grid place-items-center gap-3"
              >
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/phone.png"
                  alt="phone"
                />
                <h2 className="text-xl font-bold">Contact Customer Service</h2>
                <p className="text-gray-600">
                  Our dedicated customer service team is here to assist you with
                  any inquiries or issues you may encounter. Whether you need
                  assistance with our services, our customer service
                  representatives are ready to support you.
                </p>
                <button className="bg-accent text-white px-4 py-2 rounded-full hover:bg-accent-dark">
                  Contact Us
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
