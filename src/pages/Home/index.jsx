import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ClassroomCard from '../../components/ClassroomCard';

import IntroBanner from './components/IntroBanner';
import AblityItems from './components/AblityItems';
import IntroTab from './components/IntroTab';
// import CardItems from './components/CardItems';
import SlideBanner from './components/SlideBanner';
import { classroom } from '../../utils/api';

export default class Home extends Component {
  static displayName = 'Home';
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    classroom.selectAll().then(({ data: { data } }) => this.setState({ courses: data }));
  }

  render() {
    const { courses } = this.state;

    return (
      <div style={styles.container}>
        <Header />
        <IntroBanner {...this.props} />
        <ClassroomCard data={courses} />
        <AblityItems />
        <IntroTab />
        <SlideBanner />
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    minWidth: '1280px',
  },
};
