import { motion } from "framer-motion";
import partner1 from "../assets/images/partner-1.webp";
import partner2 from "../assets/images/partner-2.jpg";
import partner3 from "../assets/images/partner-3.png";
import partner4 from "../assets/images/partner-4.png";
import hero from "../assets/images/hero-1.jpg";
import { useInView } from "react-intersection-observer";
const AboutUs = () => {
  const [refSection1, inViewSection1] = useInView();
  const [refSection2, inViewSection2] = useInView();
  const [refSection3, inViewSection3] = useInView();
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Welcome to Our Company
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-lg mb-12">
              We are a passionate team dedicated to providing the best shopping
              experience in your neighborhood.
            </p>
            <motion.img
              src={hero}
              alt="Hero Image"
              ref={refSection1}
              className="rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inViewSection1
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Our Vision and Mission
            </h2>
            <motion.div
              className="max-w-3xl mb-12"
              ref={refSection2}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inViewSection2
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl text-center">
                At Our Company, we are driven by our dedication to support and
                uplift local stores in the neighborhood. We provide a platform
                that connects customers with a diverse range of local
                businesses, showcasing their products and services to a wider
                audience. We are passionate about helping these stores thrive
                and succeed by increasing their visibility and fostering a sense
                of community engagement.
              </p>
            </motion.div>
            <div className="max-w-4xl text-justify">
              <motion.p
                className="text-lg md:text-xl mb-6"
                ref={refSection2}
                initial={{ opacity: 0, translateX: -100 }}
                animate={
                  inViewSection2
                    ? { opacity: 1, translateX: 0 }
                    : { opacity: 0, translateX: -100 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-bold">Our vision</span> is to become the
                leading platform for connecting people with local stores in
                their neighborhood. We aim to provide a convenient and
                personalized shopping experience that supports local businesses
                and fosters a strong sense of community.
              </motion.p>
              <motion.p
                className="text-lg md:text-xl"
                ref={refSection2}
                initial={{ opacity: 0, translateX: 200 }}
                animate={
                  inViewSection2
                    ? { opacity: 1, translateX: 0 }
                    : { opacity: 0, translateX: 200 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="font-bold">Our mission</span> is to empower
                individuals to discover and support local stores in their
                neighborhood. We strive to create a platform that offers a wide
                range of products, exceptional customer service, and innovative
                solutions. Through our efforts, we aim to contribute to the
                growth and sustainability of local businesses.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Our Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Partner 1 */}

              <motion.img
                src={partner1}
                alt="Partner 1"
                ref={refSection3}
                className="rounded-lg shadow-lg object-fill"
                style={{ width: "302px", height: "244px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inViewSection3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Partner 2 */}
              <motion.img
                src={partner2}
                alt="Partner 2"
                ref={refSection3}
                className="rounded-lg shadow-lg object-fill"
                style={{ width: "302px", height: "244px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inViewSection3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              />

              {/* Partner 3 */}
              <motion.img
                src={partner3}
                alt="Partner 3"
                ref={refSection3}
                className="rounded-lg shadow-lg object-fill"
                style={{ width: "302px", height: "244px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inViewSection3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
              />

              {/* Partner 4 */}
              <motion.img
                src={partner4}
                alt="Partner 4"
                ref={refSection3}
                className="rounded-lg shadow-lg object-fill"
                style={{ width: "302px", height: "244px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inViewSection3
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
