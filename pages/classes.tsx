import type { NextPage } from "next";
import { useQuery, useClient } from "urql";
import { GetClassesDocument, GetUnitDocument } from "../gql/generated/graphql";
import { CustomList } from "../components/CustomList";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNodes } from "../state/features/navbar/navbarSlice";

const ClassesPage: NextPage = () => {
  const [classesResult] = useQuery({
    query: GetClassesDocument,
  });
  const client = useClient();
  const [classesByUnit, setClassesByUnit] = useState<{
    [unitName: string]: { id: string; name: string }[];
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setNodes([
        { value: "ProTest", href: "/" },
        {
          value: "Classes",
          href: "/classes",
        },
      ])
    );

    classesResult.data?.classes.forEach((c) => {
      let newClassesByUnit = { ...classesByUnit };

      // Get the unit name
      client
        .query(GetUnitDocument, { id: c.unit.id })
        .toPromise()
        .then((result) => {
          if (!result.data?.unit?.name) {
            console.error("Unit not found", c.unit.id);
            return;
          }

          const unitName = result.data.unit.name;

          // If the unit doesn't exist yet, create it
          if (!newClassesByUnit[unitName]) {
            newClassesByUnit[unitName] = [];
          }

          // Add the class to the unit
          newClassesByUnit[unitName].includes(c)
            ? null
            : newClassesByUnit[unitName].push(c);

          return newClassesByUnit;
        })
        .then((newClassesByUnit) => {
          if (!newClassesByUnit) {
            return;
          }

          // Don't set state if the result is the same. If we do, then there will be an infinite loop
          // TODO: This is so jank, someone fix it please
          if (
            JSON.stringify(newClassesByUnit) === JSON.stringify(classesByUnit)
          ) {
            return;
          } else {
            setClassesByUnit(newClassesByUnit);
          }
        });
    });
  }, [dispatch, classesByUnit, classesResult.data?.classes, client]);

  if (classesResult.fetching) return <p>Loading...</p>;
  if (classesResult.error) return <p>Error :(</p>;

  return (
    <>
      <Typography align="center" variant="h3">
        Classes
      </Typography>
      {Object.entries(classesByUnit).map(([unitID, classes]) => (
        <div key={unitID}>
          <Typography>{unitID}</Typography>
          <CustomList
            items={
              classes.map((class_) => {
                return {
                  text: class_.name,
                  href: `/class/${class_.id}`,
                };
              }) ?? []
            }
          />
        </div>
      ))}
    </>
  );
};

export default ClassesPage;
