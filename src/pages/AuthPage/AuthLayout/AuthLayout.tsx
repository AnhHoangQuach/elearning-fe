import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import BoxContent from "src/components/BoxContent";
import TextContent from "src/components/TextContent";
import "./AuthLayout.scss";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <BoxContent.BoxShadow style={{ maxWidth: 650, background: "white" }}>
        <Box display="flex" flexDirection="row" gap={10}>
          <TextContent.NormalText type="title-header" content={title} />
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={20}>
          {children}
        </Box>
      </BoxContent.BoxShadow>
    </div>
  );
};

export default AuthLayout;
