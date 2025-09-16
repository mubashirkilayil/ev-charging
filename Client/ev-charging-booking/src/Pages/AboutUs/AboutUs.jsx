const AboutUs = () => {
  return (
    <div className="pt-20 px-6 md:px-20 bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          About Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          We’re building the future of sustainable mobility with reliable and
          accessible EV charging solutions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Mission
          </h2>
          <p>
            To accelerate the adoption of electric vehicles by providing a
            seamless charging experience. We aim to make EV charging simple,
            fast, and available to everyone.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Vision
          </h2>
          <p>
            A greener tomorrow where electric mobility is the norm. We envision
            a world powered by clean energy, reducing carbon footprints and
            making travel sustainable.
          </p>
        </div>
      </div>

      {/* Team / Company Values */}
      <div className="bg-green-600 text-white rounded-2xl p-10 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">⚡ Innovation</h3>
            <p>
              We constantly improve our technology to provide smarter solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🌍 Sustainability</h3>
            <p>Committed to reducing environmental impact with clean energy.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🤝 Customer First</h3>
            <p>
              Your convenience is our priority — we deliver a reliable
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Join Us in Driving the Change 🚗⚡
        </h2>
        <p className="text-gray-600 mb-6">
          Be part of our mission to make EV charging easy and accessible for
          everyone.
        </p>
        <a
          href="/new-station-register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Partner with Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
