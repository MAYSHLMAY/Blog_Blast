import React from 'react';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='p-6 text-center'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8'>
          About Our Team
        </h1>
        <div className='text-lg text-gray-700 space-y-6'>
          <p>
            Welcome to Team Red's Blog! This project was inspired by our shared passion for technology and community building. We envisioned a platform where technology enthusiasts could come together to share ideas, engage in discussions, and foster a collaborative environment. The project began as a personal challenge to combine our skills in a meaningful way and has since evolved into a comprehensive social blogging app.
          </p>

          <p>
            Our team is made up of three dedicated members:
            <ul className='list-disc list-inside mt-4 space-y-2'>
              <li>
                <strong className='text-gray-800'>Zeresenay</strong>: Focused on backend development and database management. <a href="https://www.linkedin.com/in/zeresenay" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/Zeresenayaregal" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://twitter.com/zeresenay" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">Twitter</a>
              </li>
              <li>
                <strong className='text-gray-800'>Hizkeal</strong>: Worked on frontend design and development, creating an intuitive user interface. <a href="https://www.linkedin.com/in/hizkeal" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/h_i_zk" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://twitter.com/hizkeal" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">Twitter</a>
              </li>
              <li>
                <strong className='text-gray-800'>Mikiyas</strong>: Integrated an AI chatbot to enhance user interaction and provide recommendations. <a href="https://www.linkedin.com/in/mikiyas" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/MAYSHLMAY" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://twitter.com/mikiyas" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">Twitter</a>
              </li>
            </ul>
          </p>

          <p>
            This blog includes features for creating, managing, and interacting with posts. Users can follow authors, comment on posts, and enjoy a dynamic and responsive experience. We invite you to explore and contribute to our community.
          </p>

          <p>
            Check out our <a href="https://github.com/MAYSHLMAY/Blog_Blast" className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">GitHub repository</a> to view the code and learn more about the project. This is also a Portfolio Project for Holberton School.
          </p>
        </div>
      </div>
    </div>
  );
}
