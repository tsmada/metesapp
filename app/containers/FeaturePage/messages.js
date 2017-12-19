/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.FeaturePage.header',
    defaultMessage: 'Features',
  },
  scaffoldingHeader: {
    id: 'app.containers.FeaturePage.scaffolding.header',
    defaultMessage: 'Quick scaffolding',
  },
  scaffoldingMessage: {
    id: 'app.containers.FeaturePage.scaffolding.message',
    defaultMessage: `Automate the creation of components, containers, routes, selectors
  and sagas - and their tests - right from the CLI!`,
  },
  feedbackHeader: {
    id: 'app.containers.FeaturePage.feedback.header',
    defaultMessage: 'Instant feedback',
  },
  feedbackMessage: {
    id: 'app.containers.FeaturePage.feedback.message',
    defaultMessage: `
      Enjoy the best DX and code your app at the speed of thought! Your
    saved changes to the CSS and JS are reflected instantaneously
    without refreshing the page. Preserve application state even when
    you update something in the underlying code!
    `,
  },
  stateManagementHeader: {
    id: 'app.containers.FeaturePage.state_management.header',
    defaultMessage: 'Predictable state management',
  },
  stateManagementMessages: {
    id: 'app.containers.FeaturePage.state_management.message',
    defaultMessage: `
      Unidirectional data flow allows for change logging and time travel
    debugging.
    `,
  },
  javascriptHeader: {
    id: 'app.containers.FeaturePage.javascript.header',
    defaultMessage: 'Next generation JavaScript',
  },
  javascriptMessage: {
    id: 'app.containers.FeaturePage.javascript.message',
    defaultMessage: `Use template strings, object destructuring, arrow functions, JSX
    syntax and more, today.`,
  },
  cssHeader: {
    id: 'app.containers.FeaturePage.css.header',
    defaultMessage: 'Features',
  },
  cssMessage: {
    id: 'app.containers.FeaturePage.css.message',
    defaultMessage: 'Next generation CSS',
  },
  routingHeader: {
    id: 'app.containers.FeaturePage.routing.header',
    defaultMessage: 'Industry-standard routing',
  },
  routingMessage: {
    id: 'app.containers.FeaturePage.routing.message',
    defaultMessage: `
      Write composable CSS that's co-located with your components for
    complete modularity. Unique generated class names keep the
    specificity low while eliminating style clashes. Ship only the
    styles that are on the page for the best performance.
    `,
  },
  networkHeader: {
    id: 'app.containers.FeaturePage.network.header',
    defaultMessage: 'Offline-first',
  },
  networkMessage: {
    id: 'app.containers.FeaturePage.network.message',
    defaultMessage: `
      The next frontier in performant web apps: availability without a
      network connection from the instant your users load the app.
    `,
  },
  intlHeader: {
    id: 'app.containers.FeaturePage.internationalization.header',
    defaultMessage: 'Complete i18n Standard Internationalization & Pluralization',
  },
  intlMessage: {
    id: 'app.containers.FeaturePage.internationalization.message',
    defaultMessage: 'Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.',
  },
});
