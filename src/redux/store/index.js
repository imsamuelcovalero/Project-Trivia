import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';

// Aqui estamos passando pra nossa store o rootReducer, que é a combinação de nossos dois reducers. Vimos que poderíamos combinar isso diretamente dentro da função abaixo, mas separar é sempre uma boa ideia (a segmentação é uma grande vantagem e um grande peso do Redux...)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
