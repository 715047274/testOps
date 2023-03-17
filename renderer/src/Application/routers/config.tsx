import type { FC, ReactElement } from 'react';
import type { RouteProps, PathRouteProps } from 'react-router';

// import { useIntl } from 'react-intl';

import PrivateRoute from './privateRoute';

export interface WrapperRouteProps extends PathRouteProps  {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
  //const { formatMessage } = useIntl();


  return auth ? <PrivateRoute {...props} /> : <div>not allowed</div>;
};

export default WrapperRouteComponent;