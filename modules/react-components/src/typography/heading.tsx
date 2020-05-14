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

import classNames from "classnames";
import React from "react";
import { Header, HeaderProps } from "semantic-ui-react";

/**
 * Heading component prop types.
 */
interface HeadingPropsInterface extends HeaderProps {
    /**
     * Determines if the hint is in the disabled state.
     */
    disabled?: boolean;
    /**
     * Adds intentional omission to the header when a width is defined.
     */
    ellipsis?: boolean;
}

/**
 * Heading component.
 *
 * @param {HeadingPropsInterface} props - Props injected to the component.
 * @return {JSX.Element}
 */
export const Heading: React.FunctionComponent<HeadingPropsInterface> = (
    props: HeadingPropsInterface
): JSX.Element => {

    const {
        ellipsis,
        className,
        disabled,
        ...rest
    } = props;

    const classes = classNames(
        {
            ellipsis,
            disabled
        }
        , className
    );

    return (
        <Header className={ classes } { ...rest } />
    );
};
