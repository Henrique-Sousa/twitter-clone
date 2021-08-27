import { Component } from 'react';
import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';
import getFormatedDate from '../lib/getFormatedDate';

export default class Author extends Component {
  constructor(props) {
    super(props);
    this.nickName = props.nickName;
    this.name = props.name;
    this.dateDisplayed = getFormatedDate(props.date, new Date(Date.now()));
  }

  render() {
    const { nickName, name } = this.props;
    return (
      <p className="tweet__author-area">
        <AuthorNickName value={nickName} />
        <AuthorName value={name} />
        <span style={{ color: 'rgb(83, 100, 113)' }}>{` · ${this.dateDisplayed}`}</span>
      </p>
    );
  }
}
