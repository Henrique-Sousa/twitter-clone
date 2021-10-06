import { Component } from 'react';
import AuthorName from './AuthorName';
import AuthorUsername from './AuthorUsername';
import getFormatedDate from '../lib/getFormatedDate';

interface Props {
  name: string;
  username: string;
  date: Date;
}

export default class Author extends Component<Props> {
  name: string;
  username: string;
  dateDisplayed: string;

  constructor(props: Props) {
    super(props);
    this.name = props.name;
    this.username = props.username;
    this.dateDisplayed = getFormatedDate(props.date, new Date(Date.now()));
  }

  render() {
    const { name, username } = this.props;
    return (
      <p className="tweet__author-area">
        <AuthorName value={name} />
        <AuthorUsername value={username} />
        <span style={{ color: 'rgb(83, 100, 113)' }}>{` · ${this.dateDisplayed}`}</span>
      </p>
    );
  }
}
