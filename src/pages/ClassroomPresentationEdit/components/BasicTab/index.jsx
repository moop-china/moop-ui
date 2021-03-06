import React, { Component } from 'react';
// import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './index.scss';


export default class BasicTab extends Component {
  static displayName = 'BasicTab';

  render() {
    return (
      <div className="basic-tab">
        <IceContainer style={styles.tabCardStyle}>
          <ul className="subnav-item">
            <li><a href="#" className="active">1.基本信息</a></li>
            <li><a href="#">2.材料编辑</a></li>
            <li><a href="#">3.bar材料</a></li>
            <li><a href="#">4.发布</a></li>
          </ul>
        </IceContainer>
      </div>
    );
  }
}
const styles = {
  tabCardStyle: {
    padding: '0',
    margin: '20px auto 20px',
    width: '1200px',
  },
};

