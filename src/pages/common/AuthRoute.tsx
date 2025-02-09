import { Redirect, Route } from 'react-router'
import { observer } from 'mobx-react'
import { Flex, Text } from 'theme-ui'
import { AuthWrapper } from 'src/common/AuthWrapper'
import type { UserRole } from 'src/models/user.models'

/*
    This provides a <AuthRoute /> component that can be used in place of <Route /> components
    to allow user access only if authenticated.
*/

export const AuthRoute = observer(
  (props: {
    component: React.ComponentType<any>
    roleRequired?: UserRole | UserRole[]
    /** Page to redirect if role not satisfied (default shows message) */
    redirect?: string
    path?: string
    exact?: boolean
  }) => {
    const { component: Component, roleRequired, redirect, ...rest } = props

    return (
      <AuthWrapper
        roleRequired={roleRequired}
        fallback={
          redirect ? (
            <Redirect to={redirect} />
          ) : (
            <Flex
              sx={{ justifyContent: 'center' }}
              mt="40px"
              data-cy="auth-route-deny"
            >
              <Text>
                {roleRequired
                  ? `${roleRequired} role required to access this page. Please contact an admin.`
                  : 'Please login to access this page.'}
              </Text>
            </Flex>
          )
        }
      >
        <Route {...rest} render={(props) => <Component {...props} />} />
      </AuthWrapper>
    )
  },
)
