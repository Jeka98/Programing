import React, { Component } from 'react';
import '../css/style.css'


class About extends Component {
    render() {
      return (
        <div className="text-center justify-content-center">
            <h1 className="text-center ">About Us</h1>
            <h2 className="text-center">Contact page</h2>
            <p className="blockquote text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <iframe src="https://yandex.by/map-widget/v1/-/CBqvfJfMpA" width="560" height="400" frameborder="0"></iframe>
        </div>
      );
    }
  }

export default About;







