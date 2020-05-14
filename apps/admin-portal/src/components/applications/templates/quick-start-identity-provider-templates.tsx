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

import { IdentityProviderTemplateCard } from "@cicis/react-components";
import React, { FunctionComponent, SyntheticEvent } from "react";
import { IdentityProviderTemplateListItemInterface } from "../../../models";

/**
 * Proptypes for the quick start templates component.
 */
interface QuickStartIdentityProviderTemplatesPropsInterface {
    /**
     * Callback to be fired on template selection.
     */
    onTemplateSelect: (e: SyntheticEvent, { id }: { id: string }) => void;
    /**
     * List of templates.
     */
    templates: IdentityProviderTemplateListItemInterface[];
}

/**
 * Quick start application templates component.
 *
 * @param {QuickStartApplicationTemplatesPropsInterface} props - Props injected to the component.
 * @return {JSX.Element}
 */
export const QuickStartIdentityProviderTemplates: FunctionComponent<QuickStartIdentityProviderTemplatesPropsInterface> = (
    props: QuickStartIdentityProviderTemplatesPropsInterface
): JSX.Element => {

    const {
        onTemplateSelect,
        templates
    } = props;

    return (
        <>
            {
                (templates && templates instanceof Array && templates.length > 0)
                    ? templates.map((template, index) => (
                        <IdentityProviderTemplateCard
                            key={ index }
                            description={ template.description }
                            image={ template.image }
                            services={ template.services }
                            name={ template.displayName }
                            id={ template.id }
                            onClick={ onTemplateSelect }
                        />
                    ))
                    : null
            }
        </>
    );
};
