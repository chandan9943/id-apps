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
import { Header, Segment } from "semantic-ui-react";

/**
 * Danger zone group component Prop types.
 */
export interface DangerZoneGroupProps {
    /**
     * Danger zone section heading.
     */
    sectionHeader: string;
}

/**
 * Danger zone group component.
 *
 * @param {DangerZoneGroupProps} props - Props injected to the danger zone group component.
 * @return {JSX.Element}
 */
export const DangerZoneGroup: React.FunctionComponent<PropsWithChildren<DangerZoneGroupProps>> = (
    props: PropsWithChildren<DangerZoneGroupProps>
): JSX.Element => {

    const {
        sectionHeader,
        children
    } = props;

    return (
        <>
            <Header as="h5" className="bold-text">{ sectionHeader }</Header>
            <Segment.Group className="danger-zone-group">
                { children }
            </Segment.Group>
        </>
    );
};
