import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const RefundPloicy = () => {
  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Refund Policy</h2>
              <p>Effective Date: January 1, 2024</p>
              
              <h4>1. 30-Day Money Back Guarantee</h4>
              <p>We offer a 30-day money-back guarantee on all products. If you are not satisfied with your purchase, you can request a refund within 30 days of the purchase date.</p>
              
              <h4>2. How to Request a Refund</h4>
              <p>To request a refund, please follow these steps:</p>
              <ol>
                <li>Contact us at vadaliyaumang425@gmail.com with your order number</li>
                <li>Provide a reason for the refund request</li>
                <li>Ship the item back to us in original condition</li>
                <li>Once we receive and inspect the item, we will process your refund</li>
              </ol>
              
              <h4>3. Refund Processing Time</h4>
              <p>Refunds are typically processed within 5-10 business days after we receive the returned item. The refund will be credited to your original payment method.</p>
              
              <h4>4. Non-Refundable Items</h4>
              <p>The following items are non-refundable:</p>
              <ul>
                <li>Digital products</li>
                <li>Items damaged due to misuse</li>
                <li>Items without proof of purchase</li>
              </ul>
              
              <h4>5. Shipping Costs</h4>
              <p>Customers are responsible for return shipping costs. However, if the item is defective or damaged, we will provide a prepaid shipping label.</p>
              
              <h4>6. Contact Us</h4>
              <p>If you have questions about our Refund Policy, please contact us:</p>
              <p>Email: vadaliyaumang425@gmail.com<br/>
              Phone: +91 99794 83559</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPloicy;
