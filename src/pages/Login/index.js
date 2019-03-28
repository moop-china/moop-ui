import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { user } from '@/utils/api';
import { setCurrentUser } from '@/utils/helper';
import consts from '@/utils/consts';

export default ({ history }) => {
  const [values, setValues] = useState({});
  const onSubmit = () => {
    const { name, key } = values;

    if (name && key) {
      user.login({ data: { name, key } }).then(({ data }) => {
        if (!data.gender) {
          data.gender = consts.sex.MALE;
        }
        if (!data.thumb) {
          data.thumb = '/static/images/user.jpg';
        }
        setCurrentUser(data);
        history.push(data.check ? '/' : '/user/profile');
      });
    }
  };
  const setField = name => e => setValues({ ...values, [name]: e.target.value.trim() });

  return (
    <div className="bglog" style={{ height: '100vh' }}>
      <div className="container p-t-60">
        <h2 className="text-center"><a className="navbar-brand logo" href="index.html"><i>E</i><span>ureka</span></a></h2>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className=" card-box m-t-40">
              <h3 className="text-center uppercase">登录</h3>
              <div className="panel-body">
                <form className="form-horizontal m-t-30">
                  <div className="form-group">
                    <div className="col-12">
                      <input className="form-control" onChange={setField('name')} type="text" required placeholder="用户名" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-12">
                      <input className="form-control" onChange={setField('key')} type="password" required placeholder="密码" />
                    </div>
                    <div className="col-12 m-t-10"><a href="page-recoverpw.html">忘记密码？</a></div>
                  </div>
                  <div className="form-group text-center m-t-40">
                    <div className="col-12">
                      <button className="btn loginbnt btn-block" onClick={onSubmit}>登录</button>
                    </div>
                  </div>
                  <div className="form-group m-t-30 m-b-0">
                    <div className="col-12">没有帐号？<Link to="/register">注册</Link></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center p-30">
        <span className="fade-half">© 版权所有 Eureka</span>
      </div>
    </div>
  );
};