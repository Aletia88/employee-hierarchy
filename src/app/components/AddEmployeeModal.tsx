import React, { useState } from "react";
import { Modal, Text, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.layer.css";

interface AddEmployeeModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (name:string) => void;
  onUpdate: (newRole: string) => void;
  onDelete: () => void;
}



export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  opened,
  onClose,
  onSubmit,
  onUpdate,
  onDelete,
}) => {
  const [opene, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [newRole, setNewRole] = useState("");


  return (
    <>
      <Modal
        title="Update Position"
        opened={opened}
        onClose={onClose}
        size="45%"
      >
        {/* update current employee form */}

        <TextInput
          label="Change Position "
          placeholder="Position"
          className="py-2"
          onChange={(event) => {setNewRole(event.target.value)}}
          // {...form.getInputProps('newRole')}
        ></TextInput>
        {/* <TextInput
          label="Change Description"
          placeholder="Description"
          className="py-2"
          onChange={(event) => setNewUserName(event.target.value)}
        ></TextInput> */}
        <Button
          color="green"
          ml="25%"
          mr="5%"
          onClick={() => {
            onUpdate(newRole);
            onClose();
            console.log(newRole);
          }}
        >
          Save Changes
        </Button>
        {onDelete && (
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            color="red"
          >
            Delete Position
          </Button>
        )}

        <Text ml="50%">or</Text>
        <Text
          onClick={open}
          ml="40%"
          className="cursor-pointer"
          color="blue"
        >
         Create New Position
        </Text>
      </Modal>
        {/* New Employee form */}


      <Modal opened={opene} onClose={close} title="Create New Position">
        <TextInput
          label="Role"
          placeholder="Position"
          onChange={(event) => {setName(event.target.value)}}
          className="py-2"
        />

        {/* <TextInput
          label="Full Name"
          placeholder="Employee Name"
          onChange={(event) => setUsername(event.target.value)}
          className="py-2"
        /> */}

        <Button
          disabled={!name}
         onClick={() => {
          onSubmit(name);
          onClose();
         }
         }
          m={24}
        >
          Add New Role
        </Button>
        <br />
      </Modal>
    </>
  );
};
