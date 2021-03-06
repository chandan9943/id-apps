/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { PropsWithChildren } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";
import { ProtectedRoute } from "../components";
import { errorLayoutRoutes } from "../configs";

/**
 * Error page layout.
 *
 * @param {React.PropsWithChildren<{}>} props - Props injected to the error page layout component.
 * @return {JSX.Element}
 * @constructor
 */
export const ErrorPageLayout: React.FunctionComponent<PropsWithChildren<{}>> = (
    props: PropsWithChildren<{}>
): JSX.Element => {

    return (
        <Container className="layout-content error-page-layout">
            <Divider className="x4" hidden/>
            <Switch>
                {
                    errorLayoutRoutes.map((route, index) => (
                        route.redirectTo
                            ? <Redirect to={ route.redirectTo } />
                            : route.protected
                                ? (
                                    <ProtectedRoute
                                        component={ route.component }
                                        path={ route.path }
                                        key={ index }
                                    />
                                )
                                : (
                                    <Route
                                        path={ route.path }
                                        render={ (renderProps) =>
                                            (<route.component { ...renderProps } />)
                                        }
                                        key={ index }
                                    />
                                )
                    ))
                }
            </Switch>
            <Divider className="x3" hidden/>
        </Container>
    );
};
