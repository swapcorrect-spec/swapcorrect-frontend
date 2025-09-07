"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Security from "./security";
import PersonalInfo from "./personal-info";
import Account from "./account";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

const Settings: React.FC = () => {
  const { data } = useGetUserInfo({ enabler: true });
  console.log(data);
  const settingsTabList = [
    {
      title: "Personal Info",
      value: "personal-info",
    },
    {
      title: "Security",
      value: "security",
    },
    {
      title: "Account",
      value: "account",
    },
  ];
  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-3 text-xl">ACCOUNT SETTINGS</h6>
      <p className="text-xl font-medium text-[#222222] mb-8">All your settings and swap records in one place.</p>
      <Tabs defaultValue="personal-info" className="w-full !rounded-[26px]">
        <TabsList className="grid w-full grid-cols-3 mb-5">
          {settingsTabList.map((_, index) => (
            <TabsTrigger value={_.value} className={`rounded-[26px]`} key={index}>
              {_.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="personal-info">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Settings;
