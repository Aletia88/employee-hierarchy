"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { AddEmployeeModal } from "../components/AddEmployeeModal";
import { useParams } from "react-router-dom";

interface Position {
  name: string;
  id: string;
  parentId: string | null;
}

function Hierarchy() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [expandState, setExpandState] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(1);
  const fetchPositions = async () => {
    try {
        const response = await axios.get<Position[]>("http://localhost:3002/positions");
        setPositions(response.data);

        const initialState: Record<string, boolean> = {};
        response.data.forEach(position => {
            initialState[position.id] = false;
        });
        setExpandState(initialState);
        console.log(response.data)
    } catch (error) {
        console.log("Error fetching positions:", error);
    }
};

useEffect(() => {
    fetchPositions();
}, [])

  const addPosition = async (name: string, parentId: any) => {
    try {
      let id = counter.toString();
      let positionIds = positions.map((position) => position.id);

      while (positionIds.includes(id)) {
        id = (parseInt(id) + 1).toString();
      }
      const response = await axios.post("http://localhost:3002/positions", {
        id,
        name,
        parentId,
      });

      setCounter((prevCounter) => parseInt(id) + 1);
      console.log("Successfully added");
      fetchPositions();
    } catch {
      console.log("Something went wrong");
    }
  };

  const RemovePosition = async (positionId: string | null) => {
    try {
      // let positionIds = positions.map(position => position.id);

      await axios.delete(`http://localhost:3002/positions/${positionId}`);
      // this.positionId=positions.id;
      console.log("Successfully deleted");
      fetchPositions();
    } catch (error) {
      console.log("Error deleting position:", error);
    }
  };

  const updatePosition = async (
    positionId: string | null,
    name: string
  ) => {
    try {
      const response = await axios.get<Position>(
        `http://localhost:3002/positions/${positionId}`
      );
        
        const parentId = response?.data?.parentId;
        console.log("Parent ID:", parentId);
      await axios.put(`http://localhost:3002/positions/${positionId}`, {
        name: name,
        parentId,
      });
      console.log("Successfully updated");
      fetchPositions();
    } catch (error) {
      console.log("Error updating position:", error);
    }
  };

  const handleClick = (positionId: string) => {
    setParentId(positionId);
    setExpandState((prevState) => ({
      ...prevState,
      [positionId]: !prevState[positionId],
    }));
  };

  const renderPosition = (position: Position) => {
    const children = positions.filter(
      (child) => child.parentId === position.id
    );
    const hasChildren = children.length > 0;

    return (
      <div key={position.id} className="">
        <div className="flex items-center">
          {hasChildren && (
            <span onClick={() => handleClick(position.id)}>
              {expandState[position.id] ? (
                <CiSquareMinus size={20} />
              ) : (
                <CiSquarePlus size={20} />
              )}
            </span>
          )}
          <p
            className={
              hasChildren
                ? "px-4  text-sm rounded-md font-semibold m-1 cursor-pointer tracking-wide bg-[#00D4FF] text-white"
                : "px-4  rounded-md text-sm m-1 cursor-pointer tracking-wide bg-[#e5e5e5]"
            }
            onClick={() => {
              setParentId(position.id);
              setShowModal(true);
            }}
          >
            {position.name}
          </p>
        </div>
        {expandState[position.id] && children.length > 0 && (
          <div className="ml-5 text-lg flex flex-col items-start">
            {children.map((child) => renderPosition(child))}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = (name: string) => {
    addPosition(name, parentId);
    setShowModal(false);
  };

  const handleUpdate = (newRole: string) => {
    updatePosition(parentId, newRole);
  };

  const handleDelete = () => {
    RemovePosition(parentId);
  };

  const close = () => setShowModal(false);

  return (
    <>
      <AddEmployeeModal
        opened={showModal}
        onClose={close}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <div className="m-10">
        {positions
          .filter((position) => position.parentId === null)
          .map((position) => renderPosition(position))}
      </div>
    </>
  );
}

export default Hierarchy;
