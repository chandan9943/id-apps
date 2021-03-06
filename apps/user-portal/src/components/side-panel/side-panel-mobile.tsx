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
import { Sidebar } from "semantic-ui-react";
import { SidePanelProps } from "./side-panel";
import { SidePanelItems } from "./side-panel-items";

/**
 * Mobile side panel component Prop types.
 */
interface SidePanelMobileProps extends SidePanelProps {
    children?: React.ReactNode;
    onPusherClick: () => void;
    visible: boolean;
}

/**
 * Mobile side panel component.
 *
 * @param {SidePanelMobileProps} props - Props injected to the mobile side panel component.
 * @return {JSX.Element}
 */
export const SidePanelMobile: React.FunctionComponent<SidePanelMobileProps> = (
    props: SidePanelMobileProps
): JSX.Element => {
    const { headerHeight, children, onPusherClick, visible, onSidePanelItemClick } = props;
    return (
        <Sidebar.Pushable>
            <Sidebar
                animation="push"
                visible={ visible }
            >
                <SidePanelItems
                    type="mobile"
                    onSidePanelItemClick={ onSidePanelItemClick }
                    headerHeight={ headerHeight }
                />
            </Sidebar>
            <Sidebar.Pusher
                onClick={ onPusherClick }
                className="side-panel-pusher"
            >
                { children }
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};
