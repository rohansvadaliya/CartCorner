import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Shipping Policy"} />
      <BreadCrumb title="Shipping Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Shipping Policy</h2>
              <p>Effective Date: January 1, 2024</p>
              
              <h4>1. Shipping Methods</h4>
              <p>We offer multiple shipping options to meet your needs:</p>
              <ul>
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>Overnight Shipping:</strong> Next business day delivery</li>
              </ul>
              
              <h4>2. Shipping Costs</h4>
              <p>Shipping costs are calculated based on your location and the selected shipping method. Costs will be displayed at checkout before you complete your purchase.</p>
              
              <h4>3. Free Shipping</h4>
              <p>We offer free standard shipping on orders over ₹500. Promotional free shipping offers may apply during special events.</p>
              
              <h4>4. Tracking Your Order</h4>
              <p>Once your order ships, you will receive an email with a tracking number. You can use this number to track your package in real-time on our website.</p>
              
              <h4>5. Delivery Issues</h4>
              <p>If your order arrives damaged or late, please contact us immediately at vadaliyaumang425@gmail.com with photos and your order number.</p>
              
              <h4>6. International Shipping</h4>
              <p>We currently ship to most countries. International shipping fees and delivery times vary by location. Please contact us for more information.</p>
              
              <h4>7. Contact Us</h4>
              <p>If you have questions about shipping, please contact us:</p>
              <p>Email: vadaliyaumang425@gmail.com<br/>
              Phone: +91 99794 83559</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;
