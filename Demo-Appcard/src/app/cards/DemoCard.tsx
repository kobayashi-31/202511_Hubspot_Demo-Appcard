import React from "react";
import { EmptyState, Link, Text } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend<'crm.record.tab'>(({ context }) => <Extension context={context} />);

const Extension = ({ context }) => {

  const appCardDocsLink = 'https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/app-cards/overview';

  console.log({context});

  return (
    <>
      <EmptyState
        title="Build your app card here!"
        layout="vertical"
        imageName='building'
      >
        <Text>
          これできてるん？まじで
        </Text>
      </EmptyState>
    </>
  );
};
