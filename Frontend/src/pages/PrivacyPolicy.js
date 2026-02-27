import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Privacy Policy</h2>
              <p>Effective Date: January 1, 2024</p>
              
              <h4>1. Introduction</h4>
              <p>Cart Corner ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
              
              <h4>2. Information We Collect</h4>
              <p>We collect information in several ways:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information</li>
                <li><strong>Browsing Information:</strong> IP address, browser type, pages visited, and time spent on pages</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience</li>
              </ul>
              
              <h4>3. How We Use Your Information</h4>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Send transactional emails and updates</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send promotional materials (with your consent)</li>
              </ul>
              
              <h4>4. Data Security</h4>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              
              <h4>5. Your Rights</h4>
              <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at vadaliyaumang425@gmail.com</p>
              
              <h4>6. Contact Us</h4>
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <p>Email: vadaliyaumang425@gmail.com<br/>
              Phone: +91 99794 83559</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
