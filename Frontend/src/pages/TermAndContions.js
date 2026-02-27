import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const TermAndContions = () => {
  return (
    <>
      <Meta title={"Terms and Conditions"} />
      <BreadCrumb title="Terms and Conditions" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Terms and Conditions</h2>
              <p>Effective Date: January 1, 2024</p>
              
              <h4>1. Agreement to Terms</h4>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              
              <h4>2. Use License</h4>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) from Cart Corner for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              
              <h4>3. Disclaimer</h4>
              <p>The materials on Cart Corner's website are provided on an 'as is' basis. Cart Corner makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              
              <h4>4. Limitations</h4>
              <p>In no event shall Cart Corner or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cart Corner's website.</p>
              
              <h4>5. Accuracy of Materials</h4>
              <p>The materials appearing on Cart Corner's website could include technical, typographical, or photographic errors. Cart Corner does not warrant that any of the materials on our website are accurate, complete, or current.</p>
              
              <h4>6. Links</h4>
              <p>Cart Corner has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Cart Corner of the site. Use of any such linked website is at the user's own risk.</p>
              
              <h4>7. Modifications</h4>
              <p>Cart Corner may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
              
              <h4>8. Governing Law</h4>
              <p>These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
              
              <h4>9. Contact Us</h4>
              <p>If you have any questions about these Terms and Conditions, please contact us:</p>
              <p>Email: vadaliyaumang425@gmail.com<br/>
              Phone: +91 99794 83559</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndContions;
