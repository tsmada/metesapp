// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import App from 'containers/App';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function createChildRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/map',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MapContainer/reducer'),
          import('containers/MapContainer/sagas'),
          import('containers/MapContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectSagas(sagas.default);
          injectReducer('map', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/dash/detail/:id/:address',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ItemDetail/saga'),
          import('containers/ItemDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/invest',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/InvestorContainer'),
          import('containers/InvestorContainer/saga'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component, saga]) => {
          injectSagas(saga.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hordes',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HordeContainer')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/user/:id',
      name: '/user',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProfileContainer')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/register',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RegistrationPage/saga'),
          import('containers/RegistrationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/dash',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DashboardPage/saga'),
          import('containers/DashboardPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
     {
      path: '/login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/saga'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

// Set up the router, wrapping all Routes in the App component
export default function createRootRoute(store) {
  return {
    component: App,
    childRoutes: createChildRoutes(store),
  };
}
