/**
 * Copyright (c) 2019, cic Inc. (http://www.cic.org) All Rights Reserved.
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

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { defaultLayoutRoutes } from "../configs";

/**
 * Default page layout component Prop types.
 */
interface DefaultPageLayoutPropsInterface {
    children?: React.ReactNode;
    pageTitle: string;
    pageDescription?: string;
    pageTitleTextAlign?: "left" | "center" | "right" | "justified";
}

/**
 * Default page layout.
 *
 * @param {DefaultPageLayoutPropsInterface} props - Props injected to the default page layout component.
 * @return {JSX.Element}
 */
export const DefaultPageLayout: React.FunctionComponent<DefaultPageLayoutPropsInterface> = (
    props: DefaultPageLayoutPropsInterface
): JSX.Element => {
    const { children, pageTitle, pageDescription, pageTitleTextAlign } = props;
    return (
        <Switch>
            {
                defaultLayoutRoutes.map((route, index) => (
                    route.redirectTo
                        ? <Redirect to={ route.redirectTo } />
                        : route.protected
                            ? (
                                <ProtectedRoute
                                    component={ route.component ? route.component : null }
                                    path={ route.path }
                                    key={ index }
                                    exact={ route.exact }
                                />
                            )
                            : (
                                <Route
                                    path={ route.path }
                                    render={ (renderProps) =>
                                        route.component
                                            ? <route.component { ...renderProps } />
                                            : null
                                    }
                                    key={ index }
                                    exact={ route.exact }
                                />
                            )
                ))
            }
        </Switch>
    );
};
