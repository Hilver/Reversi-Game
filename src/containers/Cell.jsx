import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setError,
  setBoard,
  changeTurn,
  setPosDisksWhite,
  setPosDisksBlack,
  addDisks,
} from '../actions';

import CellLayout from '../components/Cell';

import '../assets/styles/Cell.css';

class Cell extends Component {
  diskOponent = () => (this.props.currentPlayer === 'white' ? 'black' : 'white')

  inBoard = (x, y) => (x >= 0) && (x < 8) && (y >= 0) && (y < 8)

  // reverse disks oponent
  reverse() {
    if (this.props.allowed.length > 0) {
      this.props.onClickCell();
      const { board } = this.props;
      const x = this.props.position[0];
      const y = this.props.position[1];
      board[x][y].disk = this.props.currentPlayer;
      board[x][y].allowedCell.forEach((cell) => {
        board[cell.X][cell.Y].disk = this.props.currentPlayer;
      });
      this.props.changeTurn();
      this.props.addDisks(this.props.allowed.length); // dispatch action
      this.props.setBoard(board);
      // save position disks in the global state
      if (this.props.currentPlayer === 'black') {
        this.props.setPosDisksBlack([x, y]);
      }
      if (this.props.currentPlayer === 'white') {
        this.props.setPosDisksWhite([x, y]);
      }
    } else {
      this.props.setError('No can put your disk here');
      setTimeout(() => {
        this.props.setError('');
      }, 2000);
    }
  }

  render() {
    const { disk, allowed, children } = this.props;
    return (
      <CellLayout
        disk={disk}
        allowed={allowed}
        onClick={this.reverse.bind(this)}
      >
        {children}
      </CellLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
  currentPlayer: state.currentPlayer,
});

const mapDispatchToProps = {
  setError,
  setBoard,
  changeTurn,
  setPosDisksWhite,
  setPosDisksBlack,
  addDisks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
