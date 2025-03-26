import { IUser, RoleDisplayMapping, UserRoles } from "@/app/utils/constants";
import React from "react";
import { Text, View } from "react-native";

interface IHeader {
  user?: IUser;
}
const Header: React.FC<IHeader> = ({ user }) => {
  return (
    <View>
      <Text>
        Welcome {user?.firstName?.toUpperCase()} -{" "}
        {RoleDisplayMapping.get(user?.role ?? UserRoles.USER)}
      </Text>
    </View>
  );
};

export default Header;
