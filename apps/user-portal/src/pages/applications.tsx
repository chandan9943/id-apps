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

import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Applications } from "../components";
import { InnerPageLayout } from "../layouts";
import { AlertInterface } from "../models";
import { addAlert } from "../store/actions";

/**
 * Applications page.
 *
 * @return {JSX.Element}
 */
export const ApplicationsPage = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    /**
     * Dispatches the alert object to the redux store.
     * @param {AlertInterface} alert - Alert object.
     */
    const handleAlerts = (alert: AlertInterface) => {
        dispatch(addAlert(alert));
    };

    return (
        <InnerPageLayout
            pageTitle={ t("views:pages.applications.title") }
            pageDescription={ t("views:pages.applications.subTitle") }
        >
            <Grid>
                <Grid.Row columns={ 1 }>
                    <Grid.Column width={ 16 }>
                        <Applications onAlertFired={ handleAlerts }/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </InnerPageLayout>
    );
};
