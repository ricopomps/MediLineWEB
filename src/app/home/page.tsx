"use client";

import CreateQueueModal from "@/components/CreateQueueModal";
import EnterQueueModal from "@/components/EnterQueueModal";
import { UserContext } from "@/context/UserProvider";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { UserType } from "@/network/api/user";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";

export default function HomePage() {
  const { user } = useAuthenticatedUser();
  const { queues } = useContext(UserContext);

  const isRecepcionista = user?.userType === UserType.recepcionista;

  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        fontFamily="sans-serif"
        style={{ fontFamily: "Inter", color: "#1976d2" }}
      >
        <strong>
          {user?.userType === UserType.patient && "Página do paciente"}
          {user?.userType === UserType.doctor && "Página do Médico"}
          {user?.userType === UserType.recepcionista &&
            "Página do Recepcionista"}
        </strong>
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            gridColumnStart: "1",
            gridColumnEnd: "2",
            marginRight: "5em",
            backgroundColor: "#dbdbdb",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Box paddingX={2} marginBottom={2} textAlign="center"></Box>

          {user?.userType === UserType.patient && (
            <EnterQueueModal userId={user._id} />
          )}
          {isRecepcionista && (
            <CreateQueueModal
              clinicDocument={user?.clinicDocument?.[0] ?? ""}
            />
          )}

          <Box marginTop={2}>
            <Typography variant="h4">
              {user?.userType === UserType.patient &&
                "Filas que você está cadastrado(a):"}
              {user?.userType === UserType.recepcionista &&
                "Filas criadas para atendimento:"}
              {user?.userType === UserType.doctor &&
                "Fila(s) com pacientes a serem atendidos:"}
            </Typography>
            <Box>
              {queues.map((queue) => (
                <Box key={queue.code} marginTop={1}>
                  <Typography color="blue" variant="h5">
                    <Link href={`/queue/${queue.code}`}>{queue.code}</Link>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </div>
        <div
          style={{
            gridColumnStart: "2",
            gridColumnEnd: "3",
            marginLeft: "5em",
            marginTop: "4em",
            backgroundColor: "#dbdbdb",
            borderRadius: "10px",
            padding: "0 20px 20px 20px",
          }}
        >
          {user && (
            <Box marginTop={4}>
              <Typography variant="h4">Dados do usuário:</Typography>
              <Box marginTop={2}>
                <Typography variant="h6">
                  <PersonIcon />
                  Nome: {user.name}
                </Typography>
                <Typography variant="h6">
                  <EmailIcon />
                  E-mail: {user.email}
                </Typography>
                <Typography variant="h6">
                  <BadgeIcon />
                  CPF: {user.cpf}
                </Typography>
              </Box>
            </Box>
          )}
        </div>
      </div>
    </Container>
  );
}
