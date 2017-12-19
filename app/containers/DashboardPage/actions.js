/*
 *
 * DashboardPage actions
 *
 */

import {
  LOAD_LISTINGS,
} from './constants';

export function defaultAction() {
  return {
    type: LOAD_LISTINGS,
  };
}
