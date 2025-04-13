import { Lock, Mail, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const ContactInfoCell = ({
  email,
  telegramNumber,
}: {
  email: string;
  telegramNumber: string;
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.user_role === "ADMIN";
  return (
    <>
      {isAdmin ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{email}</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{telegramNumber}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Hidden Info</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactInfoCell;
