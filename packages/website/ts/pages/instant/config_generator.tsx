import * as _ from 'lodash';
import * as React from 'react';

import { Container } from 'ts/components/ui/container';
import { Select, SelectItemConfig } from 'ts/components/ui/select';
import { Text } from 'ts/components/ui/text';
import { colors } from 'ts/style/colors';

import { ZeroExInstantBaseConfig } from '../../../../instant/src/types';

export interface ConfigGeneratorProps {
    value: ZeroExInstantBaseConfig;
    onConfigChange: (config: ZeroExInstantBaseConfig) => void;
}

const SRA_ENDPOINTS = ['https://api.radarrelay.com/0x/v2/', 'https://api.openrelay.xyz/v2/'];

export class ConfigGenerator extends React.Component<ConfigGeneratorProps> {
    public render(): React.ReactNode {
        const { value } = this.props;
        return (
            <Container>
                <ConfigGeneratorSection title="Standard Relayer API Endpoint">
                    <Select value={value.orderSource as string} items={this._generateItems()} />
                </ConfigGeneratorSection>
                <ConfigGeneratorSection title="What tokens can users buy?">BLAH</ConfigGeneratorSection>
            </Container>
        );
    }
    private readonly _generateItems = (): SelectItemConfig[] => {
        return _.map(SRA_ENDPOINTS, endpoint => ({
            text: endpoint,
            onClick: this._handleSRASelection.bind(this, endpoint),
        }));
    };
    private readonly _handleSRASelection = (sraEndpoint: string) => {
        const newConfig = {
            ...this.props.value,
            orderSource: sraEndpoint,
        };
        this.props.onConfigChange(newConfig);
    };
}

export interface ConfigGeneratorSectionProps {
    title: string;
    actionText?: string;
    onActionTextClick?: () => void;
}

export const ConfigGeneratorSection: React.StatelessComponent<ConfigGeneratorSectionProps> = props => (
    <Container marginBottom="30px">
        <Container marginBottom="10px">
            <Text fontColor={colors.white} fontSize="16px" lineHeight="18px">
                {props.title}
            </Text>
        </Container>
        {props.children}
    </Container>
);
