import CloseIcon from "@mui/icons-material/Close";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  ModalTitle,
  ModalDescription,
  CloseIconButton,
  CancelButton,
  ConfirmButton,
} from "./styles";

const Modal = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText="Cancel",
    confirmColor="primary",
    children,
    showConfirm = true,
}) => {
    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>
                <ModalTitle variant="h3">{title}</ModalTitle>
                <CloseIconButton onClick={onClose} size="small">
                    <CloseIcon fontSize="small"/>
                </CloseIconButton>
            </StyledDialogTitle>
            <StyledDialogContent dividers>
                {description && (
                    <ModalDescription variant="body1" sx={{mb: children ? 2:0}}>
                        {description}
                    </ModalDescription>
                )}
                {children}
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onClose} variant="outlined">
                    {cancelText}
                </CancelButton>
                {showConfirm && confirmText && (
                    <ConfirmButton
                        onClick={onConfirm}
                        variants="contained"
                        color={confirmColor}
                    >
                        {confirmText}
                    </ConfirmButton>
                )}
            </StyledDialogActions>
        </StyledDialog>
    )
};
export default Modal;