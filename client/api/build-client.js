import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    try {
      return axios.create({
        baseURL:
          'http://www.expressefile.net/',
        headers: req.headers,
      });
    } catch (error) {
       
    }
    
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
