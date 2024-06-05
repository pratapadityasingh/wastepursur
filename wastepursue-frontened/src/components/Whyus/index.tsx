// WhyUsSection.js

import React from 'react';

const WhyUsSection = () => {
  return (
    <section className=" py-12 container overflow-hidden bg-[#060B27]">
      <div className="container  ">
        <div className="flex flex-wrap ">
          <div className="w-full  md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="why_us_col bg-white rounded-lg p-6 flex items-center">
              <img src="/rupee_h5cohN94jkyh.png" alt="Best Rates" className="w-12 h-12 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Best Rates</h4>
                <p className="text-gray-600">We provide the best value for your scrap from our network of Recyclers.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="why_us_col bg-white rounded-lg p-6 flex items-center">
              <img src="/thumbs-up_vOIp-YChzZhh.png" alt="Convenience" className="w-12 h-12 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Convenience</h4>
                <p className="text-gray-600">Doorstep pickup according to user's convenient date & time.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="why_us_col bg-white rounded-lg p-6 flex items-center">
              <img src="/trust_TmQdK2fLBVD.png" alt="Trust" className="w-12 h-12 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Trust</h4>
                <p className="text-gray-600">Trained & Verified Pickup Staff with Swapeco Smart Weighing Scale</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6">
            <div className="why_us_col bg-white rounded-lg p-6 flex items-center">
              <img src="/eco_wwfqNtl3n-r.png" alt="Eco-friendly" className="w-12 h-12 mr-4" />
              <div>
                <h4 className="text-lg font-semibold">Eco-friendly</h4>
                <p className="text-gray-600">We ensure responsible recycling of your scrap items.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
