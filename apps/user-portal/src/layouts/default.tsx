/**
 * Copyright (c) 2019, cic (http://www.cic.org) All Rights Reserved.
 *
 * cic licenses this file to you under the Apache License,
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

import * as React from "react";
import { Container, Divider } from "semantic-ui-react";
import { AppFooter, Header as AppHeader, PageHeader } from "../components";
import {useState} from "react";

/**
 * Default page layout component Prop types.
 */
interface DefaultPageLayoutProps {
    children?: React.ReactNode;
    pageTitle: string;
    pageDescription?: string;
    pageTitleTextAlign?: "left" | "center" | "right" | "justified";
}

/**
 * Default page layout.
 *
 * @param {DefaultPageLayoutProps} props - Props injected to the default page layout component.
 * @return {JSX.Element}
 */
export const DefaultPageLayout: React.FunctionComponent<DefaultPageLayoutProps> = (
    props: DefaultPageLayoutProps
): JSX.Element => {
    const { children, pageTitle, pageDescription, pageTitleTextAlign } = props;

    return (
        <>
            <AppHeader onSidePanelToggleClick={ undefined } type="desktop" onSidePanelItemClick={ undefined } headerHeight={ undefined } />
            <Container className="layout-content default-layout">
                <Divider className="x2" hidden/>
                <PageHeader
                    title={ pageTitle }
                    description={ pageDescription }
                    titleTextAlign={ pageTitleTextAlign }
                />
                { children }
                <Divider className="x3" hidden/>
            </Container>
            <AppFooter/>
        </>
    );
};
