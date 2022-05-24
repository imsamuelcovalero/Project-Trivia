import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Cria uma classe para mostrar a Header da página
class Header extends Component {
  constructor() {
    super();
    this.state = {
      userScore: 0,
    };
  }

  // somaTotalPrice = (currentExpense) => {
  //   console.log(currentExpense);
  //   const { totalPrice } = this.state;
  //   const { currentPrice, expenseValue } = currentExpense;
  //   // const xablau = currentExpense.expenseValue;
  //   console.log(expenseValue);
  //   console.log(currentPrice);
  //   // const somaDespesa = currentExpense[0].expenseValue * currentExpense[0].currentPrice;
  //   // this.setState({
  //   //   totalPrice: totalPrice + somaDespesa,
  //   // }, () => totalPrice);
  // }

  render() {
    const { userScore } = this.state;
    const { userName, expense } = this.props;
    // console.log(expense);

    return (
      <header>
        <h4 data-testid="header-profile-picture">
          { userName }
        </h4>
        <h4 data-testid="header-player-name">
          { userName }
        </h4>
        <h4 data-testid="header-score">
          { userName }
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userName: globalState.login.userName,
  expense: globalState.wallet.expenses,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Header);
