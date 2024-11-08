import React from 'react';

function UserData() {
  const data = {
    name: "Siddharth Thakkar",
    description: "A budding full stack developer",
    interests: ["Coding", "Football (Soccer)", "Chess"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/sidthakkar/",
      twitter: "https://x.com/woustachemax7",
    },
  };

  return (
    <div>
      <App 
        name={data.name}
        description={data.description}
        interests={data.interests}
        socialLinks={data.socialLinks} 
      />
    </div>
  );
}

export default UserData;
