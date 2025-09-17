import { useState } from "react";
import useBlog from "../context/useBlog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Admin({lang}) {
  const { posts, createPost, deletePost, editPost } = useBlog();
  const { t } = useTranslation();

  const [form, setForm] = useState({ Title: "", Content: "", ImageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Create new post
  const handleCreate = async () => {
    try {
      await createPost(form);
      setSnackbar({
        open: true,
        message: t("post_created"),
        severity: "success",
      });
      setForm({ Title: "", Content: "", ImageUrl: "" });
    } catch (err) {
      console.log(err);
      setSnackbar({
        open: true,
        message: t("post_failed"),
        severity: "error",
      });
    }
  };

  // Update post
  const handleUpdate = async () => {
    try {
      await editPost(editingId, form);
      setSnackbar({
        open: true,
        message: t("post_updated"),
        severity: "success",
      });
      setOpenDialog(false);
      setEditingId(null);
      setForm({ Title: "", Content: "", ImageUrl: "" });
    } catch (err) {
      console.log(err);
      setSnackbar({
        open: true,
        message: t("post_update_failed"),
        severity: "error",
      });
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setSnackbar({
        open: true,
        message: t("post_deleted"),
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbar({
        open: true,
        message: t("post_delete_failed"),
        severity: "error",
      });
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  // Open edit dialog
  const handleEdit = (post) => {
    setForm({
      Id: post.Id,
      Title: post.Title,
      Content: post.Content,
      ImageUrl: post.ImageUrl,
    });
    setEditingId(post.Id);
    setOpenDialog(true);
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#e0e0e0",
        direction: lang === "ar" ? "rtl" : "ltr"
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#90caf9" }}>
        {t("admin_dashboard")}
      </h2>

      {/* Create Post */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxShadow: "0 6px 12px rgba(0,0,0,0.5)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#ffb74d" }}>
          {t("create_new_post")}
        </h3>

        <input
          type="text"
          placeholder={t("title")}
          value={form.Title}
          onChange={(e) => setForm({ ...form, Title: e.target.value })}
          style={{
            width: "100%",
            padding: "0.7rem",
            marginBottom: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#2c2c2c",
            color: "#fff",
          }}
        />

        <textarea
          placeholder={t("content")}
          value={form.Content}
          onChange={(e) => setForm({ ...form, Content: e.target.value })}
          rows={4}
          style={{
            width: "100%",
            padding: "0.7rem",
            marginBottom: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#2c2c2c",
            color: "#fff",
            resize: "none",
          }}
        />

        <input
          type="text"
          placeholder={t("image_url")}
          value={form.ImageUrl}
          onChange={(e) => setForm({ ...form, ImageUrl: e.target.value })}
          style={{
            width: "100%",
            padding: "0.7rem",
            marginBottom: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#2c2c2c",
            color: "#fff",
          }}
        />

        <button
          onClick={handleCreate}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(45deg, #42a5f5, #478ed1)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {t("add_post")}
        </button>
      </div>

      {/* Posts List */}
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#81c784" }}>
          {t("all_posts")}
        </h3>
        {posts.length === 0 ? (
          <p style={{ color: "#aaa" }}>{t("no_posts")}</p>
        ) : (
          posts.map((p) => (
            <div
              key={p.Id}
              style={{
                backgroundColor: "#1e1e1e",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                textAlign: "center",
              }}
            >
              <h4 style={{ marginBottom: "0.5rem", color: "#90caf9" }}>
                {p.Title}
              </h4>
              <p style={{ marginBottom: "0.8rem", color: "#ccc" }}>
                {p.Content}
              </p>
              {p.ImageUrl && (
                <img
                  src={p.ImageUrl}
                  alt={p.Title}
                  style={{
                    maxWidth: "100px",
                    borderRadius: "8px",
                    marginBottom: "0.8rem",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => handleEdit(p)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(45deg, #42a5f5, #1e88e5)",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {t("edit")}
                </button>
                <button
                  onClick={() => setDeleteDialog({ open: true, id: p.Id })}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(45deg, #e57373, #d32f2f)",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null })}
      >
        <DialogTitle>{t("confirm_delete")}</DialogTitle>
        <DialogContent>
          <Typography>{t("delete_confirm_text")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(deleteDialog.id)}
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{t("edit")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("title")}
            fullWidth
            variant="outlined"
            value={form.Title}
            onChange={(e) => setForm({ ...form, Title: e.target.value })}
            margin="dense"
          />

          <TextField
            label={t("content")}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={form.Content}
            onChange={(e) => setForm({ ...form, Content: e.target.value })}
            margin="dense"
          />

          <TextField
            label={t("image_url")}
            fullWidth
            variant="outlined"
            value={form.ImageUrl}
            onChange={(e) => setForm({ ...form, ImageUrl: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t("cancel")}</Button>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            {t("update")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
