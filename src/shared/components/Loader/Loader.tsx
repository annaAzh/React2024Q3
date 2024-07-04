import { Component } from 'react';
import loader from '../../../assets/loader.png';
import style from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={style.loader}>
        <img className={style.loader_img} src={loader} alt="loader" />
      </div>
    );
  }
}

export { Loader };
