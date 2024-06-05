import Image from 'next/image';
import WhyUsSection from '../Whyus';

const AboutUs = () => {
  const creators = [
    {
      name: 'Bharat Babriwal',
      role: 'Backend Developer',
      image: "/bharatfinal.jpg"
    },
    {
      name: 'Aditya Pratap',
      role: 'Lead Developer',
      image: '/adityafinal.jpg',
    },
    {
      name: 'Ankit Chakrawarti',
      role: 'Mentor & Guide',
      image: '/sir.jpg',
    },
    {
      name: 'Aayush Jat',
      role: 'UI/UX Designer',
      image: '/aayushjat.jpg',
    },
    {
      name: 'Aayushi Mukati',
      role: 'Frontend Developer',
      image: '/aayushimu.jpg',
    },
    
  ];

  return (
    <>
      <div className="min-h-screen py-10 bg-[#060B27] bg-hero">
        <div className="max-w-9xl mx-2 px-4 sm:px-8 ">
          <h1 className="text-4xl font-bold text-center text-white mb-12">About Us</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {creators.map((creator, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center aboutus">
                <div className="mb-4">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{creator.name}</h2>
                <p className="text-gray-600">{creator.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-white">Our mission is to turn waste into something valuable and sustainable.</p>
          </div>
        </div>
      </div>
      <WhyUsSection/>
    </>
  );
};

export default AboutUs;
