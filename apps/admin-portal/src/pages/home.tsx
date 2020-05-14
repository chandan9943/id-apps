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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PageHeader } from "../components";
import { resolveUserDisplayName } from "../helpers";
import { AuthStateInterface } from "../models";
import { AppState } from "../store";

/**
 * Overview page.
 *
 * @return {JSX.Element}
 */
export const HomePage = (): JSX.Element => {
    const { t } = useTranslation();
    const profileDetails: AuthStateInterface = useSelector((state: AppState) => state.authenticationInformation);

    return (
        <PageHeader
            title={ t(
                "views:pages.overView.title",
                { firstName: resolveUserDisplayName(profileDetails) }
            ) }
            description={ t("views:pages.overView.subTitle") }
            titleTextAlign="left"
        />
    );
};
