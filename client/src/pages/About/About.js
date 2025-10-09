import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">About <span className="text-secondary">GUARD</span>BULLDOG</h1>
          <p className="mt-4 text-xl text-gray-600">
            Protecting the Bowie State University community from digital threats.
          </p>
        </div>

        <div className="mt-12 text-lg text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="mt-2">
              <strong>GUARDBULLDOG</strong> is a comprehensive phishing awareness and security reporting platform designed specifically for the students, faculty, and staff of Bowie State University. Our mission is to create a safer digital campus by empowering our community to recognize, report, and defend against malicious cyber threats like phishing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">The Threat</h2>
            <p className="mt-2">
              In today's digital age, email-based attacks are more sophisticated than ever. Phishing scams attempt to trick individuals into revealing sensitive personal information, such as passwords, credit card numbers, and social security numbers. These attacks not only pose a risk to individuals but also to the security and integrity of the entire university network.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Approach</h2>
            <p className="mt-2">
              We believe that a combination of cutting-edge technology and continuous education is the most effective defense. GUARDBULLDOG provides:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 pl-4">
              <li>
                <strong>AI-Powered Detection:</strong> An advanced system to help analyze and flag suspicious emails before they can do harm.
              </li>
              <li>
                <strong>Instant Reporting:</strong> A simple, one-click tool to report suspicious emails directly to the university's security team, allowing for rapid response.
              </li>
              <li>
                <strong>Educational Resources:</strong> A library of articles, tutorials, and simulations to help you learn how to spot the signs of a phishing attack and adopt safer online habits.
              </li>
              <li>
                <strong>Community Defense:</strong> By reporting threats, you are not just protecting yourself—you are helping to protect the entire Bowie State community.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
