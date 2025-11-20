import React, { useState } from "react";
import {
  hubspot,
  Text,
  Heading,
  Flex,
  Box,
  Button,
  Divider,
  Input,
  Select,
  DateInput,
  Toggle,
  TextArea,
  Alert,
  Tag,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Accordion,
  NumberInput,
  Link,
  StatusTag,
} from "@hubspot/ui-extensions";

hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension context={context} runServerless={runServerlessFunction} actions={actions} />
));

const Extension = ({ context, runServerless, actions }: { context: any, runServerless: any, actions: any }) => {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <Flex direction="column" gap="md">
      {/* 1. イントロダクション */}
      <Box>
        <Heading>HubSpot UI Extension 機能デモ</Heading>
        <Text>
          このカードは、HubSpotのカスタムカード開発で利用可能な主要なコンポーネントと機能を網羅的に紹介するためのデモです。
          Reactベースで柔軟なUIを構築できます。
        </Text>
      </Box>

      <Divider />

      {/* 2. コンテキスト情報 (CRMデータ連携) */}
      <Accordion title="1. CRMコンテキスト情報 (データ連携)" defaultOpen={true}>
        <Flex direction="column" gap="sm">
          <Text>現在開いているレコードの情報にアクセスできます。</Text>
          <Box>
            <Flex direction="column" gap="xs">
              <Text format={{ fontWeight: "bold" }}>Portal ID: <Text format={{ fontWeight: "regular" }}>{context.portal.id}</Text></Text>
              <Text format={{ fontWeight: "bold" }}>User ID: <Text format={{ fontWeight: "regular" }}>{context.user.id}</Text></Text>
              <Text format={{ fontWeight: "bold" }}>Object Type: <Text format={{ fontWeight: "regular" }}>{context.crm.objectType}</Text></Text>
              <Text format={{ fontWeight: "bold" }}>Record ID: <Text format={{ fontWeight: "regular" }}>{context.crm.objectId}</Text></Text>
            </Flex>
          </Box>
          <Box>
            <Alert title="ポイント" variant="info">
              `context` オブジェクトを通じて、現在のユーザーやレコードの情報にアクセスし、動的な処理が可能です。
            </Alert>
          </Box>
        </Flex>
      </Accordion>

      {/* 3. フォーム入力コンポーネント */}
      <Accordion title="2. フォーム入力コンポーネント" defaultOpen={false}>
        <Flex direction="column" gap="md">
          <Text>ユーザーからの入力を受け付けるための多様なコンポーネントがあります。</Text>
          
          <Input
            label="テキスト入力 (Input)"
            name="text-input"
            placeholder="名前を入力..."
            value={name}
            onChange={(value) => setName(value)}
          />
          <Text variant="microcopy">入力された値: {name}</Text>

          <Select
            label="選択肢 (Select)"
            name="select-input"
            options={[
              { label: "オプション A", value: "A" },
              { label: "オプション B", value: "B" },
              { label: "オプション C", value: "C" },
            ]}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value as string)}
            placeholder="選択してください"
          />

          <Flex gap="md" align="end">
             <DateInput label="日付選択 (DateInput)" name="date-input" />
             <NumberInput label="数値入力" name="number-input" min={0} />
          </Flex>

          <Toggle
            label="トグルスイッチ (Toggle)"
            checked={toggleValue}
            onChange={(value) => setToggleValue(value)}
          />
          <Text>機能を有効にする: {toggleValue ? "ON" : "OFF"}</Text>

          <TextArea label="複数行テキスト (TextArea)" name="textarea" resize="vertical" />
        </Flex>
      </Accordion>

      {/* 4. アクションとボタン */}
      <Accordion title="3. アクションとボタン" defaultOpen={false}>
        <Flex direction="column" gap="md">
          <Text>様々なスタイルのボタンでアクションをトリガーできます。</Text>
          <Flex gap="sm" wrap="wrap">
            <Button onClick={() => actions.addAlert({ title: "クリックされました", variant: "success" })}>Primary Button</Button>
            <Button variant="secondary" onClick={() => {}}>Secondary Button</Button>
            <Button variant="destructive" onClick={() => {}}>Destructive</Button>
          </Flex>
          <Text>リンク形式のボタンも可能です。</Text>
          <Link href="https://www.hubspot.com">外部サイトへリンク (Link)</Link>
        </Flex>
      </Accordion>

      {/* 5. データ表示とレイアウト */}
      <Accordion title="4. データ表示とレイアウト" defaultOpen={false}>
        <Flex direction="column" gap="md">
          <Text>データを視覚的に整理して表示するためのコンポーネントです。</Text>

          <Box>
            <Heading>統計情報 (Statistics)</Heading>
            <Flex gap="md">
              <Box>
                <Text format={{ fontWeight: "bold" }}>売上</Text>
                <Heading>$12,345</Heading>
                <Text variant="microcopy" format={{ fontWeight: "bold" }}>前月比 +5%</Text>
              </Box>
              <Box>
                <Text format={{ fontWeight: "bold" }}>アクティブユーザー</Text>
                <Heading>1,234</Heading>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Heading>タグとステータス</Heading>
            <Flex gap="sm">
              <Tag>通常タグ</Tag>
              <StatusTag variant="success">Success</StatusTag>
              <StatusTag variant="warning">Warning</StatusTag>
              <StatusTag variant="danger">Error</StatusTag>
            </Flex>
          </Box>

          <Box>
            <Heading>テーブル表示 (Table)</Heading>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>名前</TableHeader>
                  <TableHeader>ステータス</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Project A</TableCell>
                  <TableCell><StatusTag variant="success">完了</StatusTag></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Project B</TableCell>
                  <TableCell><StatusTag variant="warning">進行中</StatusTag></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Flex>
      </Accordion>

      {/* 6. 通知とアラート */}
      <Accordion title="5. 通知とアラート" defaultOpen={false}>
        <Flex direction="column" gap="md">
           <Alert title="情報 (Info)" variant="info">ユーザーへの情報提供に使用します。</Alert>
           <Alert title="成功 (Success)" variant="success">処理が成功したことを伝えます。</Alert>
           <Alert title="警告 (Warning)" variant="warning">注意が必要な場合に使用します。</Alert>
           <Alert title="エラー (Danger)" variant="danger">エラーが発生したことを伝えます。</Alert>
           
           <Button 
             onClick={() => actions.addAlert({ 
               title: "トースト通知", 
               message: "画面上部に通知を表示することもできます。",
               variant: "info" 
             })}
           >
             トースト通知を表示
           </Button>
        </Flex>
      </Accordion>

    </Flex>
  );
};
