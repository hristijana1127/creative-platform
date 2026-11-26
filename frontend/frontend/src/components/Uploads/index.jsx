import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Skeleton,
  Box,
} from "@mui/material";
import {
  StyledContainer,
  StyledHeader,
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
  FileInfoContainer,
  FileNameContainer,
} from "./styles.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { mockFiles } from "../../constants/mockCategories.js";
import { mockFileTypes } from "../../constants/mockCategories.js"
//import { getSubcategories } from "../../api/getSubcategories.js";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import AddFileForm from "../../components/AddFileForm";
import { mockSubCategories } from "../../constants/mockCategories";


const getFileIcon = (type) => {
  switch (type) {
    case "PDF":
      return <PictureAsPdfIcon color="error" />;

    case "Word":
      return <DescriptionIcon color="primary" />;

    case "Image":
      return <ImageIcon color="success" />;

    default:
      return <InsertDriveFileIcon />;
  }
};


const RecentUploads = ({
  isMyMaterials,
  headerTitle = "Recently Uploaded",
}) => {
  const [materials, setMaterials] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentUploads = async () => {
      setLoading(true);
      setError(null);

      try {
        const [files, fileTypesRaw, subcategoriesRaw] = await Promise.all([
          mockFiles,
          mockFileTypes,
          mockSubCategories
        ]);
        console.log("RecentUploads files:", files);
        console.log("RecentUploads file types:", fileTypesRaw);
        console.log("RecentUploads subcategories:", subcategoriesRaw);

        const normalizeArray = (value) =>
          Array.isArray(value) ? value : (value?.data ?? []);

        const fileTypesData = normalizeArray(fileTypesRaw);
        const subcategoriesData = normalizeArray(subcategoriesRaw);

        const fileTypeMap = fileTypesData.reduce((map, type) => {
          if (type?.fileTypeId) {
            map[type.fileTypeId] = type.name;
          }
          return map;
        }, {});

        const resolvedFiles = Array.isArray(files)
          ? files.map((file) => ({
              ...file,
              fileTypeName:
                file.fileTypeName || fileTypeMap[file.fileTypeId] || "Unknown",
            }))
          : [];

        setMaterials(resolvedFiles);
        setFileTypes(fileTypesData);
        setSubcategories(subcategoriesData);
      } catch (err) {
        console.error("Error fetching recent uploads:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUploads();
  }, []);

  if (loading) {
    return (
      <StyledContainer>
        <StyledHeader>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {headerTitle}
          </Typography>
        </StyledHeader>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>File Name</StyledTableCell>
                <StyledTableCell align="right">File Type</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" width={150} height={20} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Skeleton variant="text" width={80} height={20} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Skeleton variant="circular" width={40} height={40} />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          {headerTitle}
        </Typography>

        {isMyMaterials ? (
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
              console.log("Open modal", openModal);
            }}
          >
            + Add File
          </Button>
        ) : (
          <Button onClick={() => navigate("/yourPosts")}>View All</Button>
        )}
      </StyledHeader>

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell>Upload Date</StyledTableCell>
              <StyledTableCell>File Type</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {materials.map((material) => (
              <StyledTableRow key={material.fileId}>
                <StyledTableCell>
                  <FileInfoContainer>
                    <Avatar
                      sx={{
                        width: 42,
                        height: 42,
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {getFileIcon(material.fileTypeName)}
                    </Avatar>

                    <FileNameContainer>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        {material.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "text.secondary",
                        }}
                      >
                        {material.fileTypeName} File
                      </Typography>
                    </FileNameContainer>
                  </FileInfoContainer>
                </StyledTableCell>

                {/* <StyledTableCell>{material.subject}</StyledTableCell> */}

                <StyledTableCell>
                  {new Date(material.createdAt).toLocaleDateString()}
                </StyledTableCell>

                {/* <StyledTableCell>{material.size}</StyledTableCell> */}

                <StyledTableCell>{material.fileTypeName}</StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Add File"
          confirmText="Upload"
        >
          <AddFileForm fileTypes={fileTypes} subcategories={subcategories} />
        </Modal>
      )}
    </StyledContainer>
  );
};

export default RecentUploads;

