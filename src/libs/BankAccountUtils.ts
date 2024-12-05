import {Str} from 'expensify-common';
import type {OnyxEntry} from 'react-native-onyx';
import type * as OnyxTypes from '@src/types/onyx';
import type {ReportNextStep} from '@src/types/onyx';
import CONST from '@src/CONST';
import DateUtils from './DateUtils';

function getDefaultCompanyWebsite(session: OnyxEntry<OnyxTypes.Session>, user: OnyxEntry<OnyxTypes.User>): string {
    return user?.isFromPublicDomain ? '' : `https://www.${Str.extractEmailDomain(session?.email ?? '')}`;
}

function getLastFourDigits(bankAccountNumber: string): string {
    return bankAccountNumber ? bankAccountNumber.slice(-4) : '';
}

function buildOptmisticNextStepAfterBA(){
    const type: ReportNextStep['type'] = 'neutral';
    const optimisticNextStep: ReportNextStep = {
        type,
        icon: CONST.NEXT_STEP.ICONS.STOPWATCH,
        message: [
            {
                text: 'Waiting for ',
            },
            {
                text: `payment`,
            },
            {
                text: ' to ',
            },
            {
                text: 'complete',
            },
            {
                text: `By ${DateUtils.getSixDaysFromNow().split(' ')[0]}`,
            },
        ],
    };

    return optimisticNextStep;
}

export {getDefaultCompanyWebsite, getLastFourDigits,buildOptmisticNextStepAfterBA};
