"use client";
import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter, usePathname, useParams } from "next/navigation";
import PropTypes from "prop-types";

export default function UserReqres({ avatar, first_name, id }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center space-x-5">
      <Avatar src={avatar} />
      <Text>{first_name}</Text>
      {id > 0 && (
        <Button onClick={() => router.push(`${pathname}/${id}/detail`)}>
          Detail
        </Button>
      )}
    </div>
  );
}

UserReqres.propTypes = {
  avatar: PropTypes.string.isRequired,
  first_name: PropTypes.number.isRequired,
  id: PropTypes.number,
};

UserReqres.defaultProps = {
  id: 0,
};
