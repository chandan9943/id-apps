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

import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { WidgetIcons } from "../../../configs";
import { history } from "../../../helpers";
import { SettingsSection } from "../../shared";

/**
 * Account security widget.
 *
 * @return {JSX.Element}
 */
export const AccountSecurityWidget: FunctionComponent<{}> = (): JSX.Element => {
    const { t } = useTranslation();

    const navigate = () => {
        history.push("/security");
    };

    return (
        <div className="widget account-security">
            <SettingsSection
                header={ t("views:components.overview.widgets.accountSecurity.header") }
                description={ t("views:components.overview.widgets.accountSecurity.description") }
                primaryAction={ t("views:components.overview.widgets.accountSecurity.actionTitles.update") }
                onPrimaryActionClick={ navigate }
                icon={ WidgetIcons.accountSecurity }
                iconMini={ WidgetIcons.accountSecurity }
                iconSize="tiny"
                iconStyle="twoTone"
            />
        </div>
    );
};
