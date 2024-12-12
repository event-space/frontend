import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { ISpace } from '../../entities/types/ISpace';
import useFetch from '../../shared/network/useFetch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserStore } from '../../app/store/useUserStore';

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserStore();
  const [space, setSpace] = useState<ISpace | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null); // New state for delete comment ID
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // Modal visibility state

  const { fetchData } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/space/${id}`,
  );
  const { fetchData: fetchComments } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/comments/space/${id}`,
  );
  const { fetchData: postComment } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/comments`,
  );
  const { fetchData: deleteComment } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/comments/${deleteCommentId}`,
  );

  useEffect(() => {
    if (id) {
      fetchData({
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response: any) => {
        if (response) {
          setSpace(response);
        }
      });

      fetchComments({
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response: any) => {
        if (response) {
          setComments(response);
        }
      });
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    const response = await postComment({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: user?.username,
        spaceId: id,
        content: commentInput,
      }),
    });

    if (response) {
      setComments(prevComments => [
        ...prevComments,
        {
          content: commentInput,
          userEmail: user?.username,
          createTime: new Date().toISOString(),
        },
      ]);
      setCommentInput(''); // Clear input field
    }
  };

  const handleEditComment = useCallback((index: number) => {
    setEditCommentIndex(index);
    setEditedComment(comments[index].content);
  }, []);

  const handleSaveEditComment = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].content = editedComment;

    setComments(updatedComments);
    setEditCommentIndex(null);
  };

  const handleDeleteComment = (commentId: string) => {
    setDeleteCommentId(commentId); // Set the ID of the comment to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const confirmDeleteComment = async () => {
    try {
      const response = await deleteComment({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== deleteCommentId),
        );
        setDeleteCommentId(null); // Reset the deleteCommentId after successful deletion
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
    setOpenDeleteDialog(false); // Close the dialog after deletion
    window.location.reload();
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
    setDeleteCommentId(null); // Reset delete comment ID
  };

  if (!space) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <div className="container">
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="600"
          image={`https://space-event.kenuki.org/order-service/api/v1/files/${space?.imageUrl}`}
          alt={space?.name}
          sx={{
            borderRadius: '8px 8px 0 0',
            objectFit: 'cover',
            maxHeight: 600,
          }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {space?.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {space?.address}
            </Typography>
          </Box>
          <Typography variant="body2" color="textPrimary" paragraph>
            <strong>Location:</strong> {space?.location}
          </Typography>
          <Typography variant="body2" color="textPrimary" paragraph>
            <strong>Size:</strong> {space?.size} m²
          </Typography>
          <Typography variant="body2" color="textPrimary" paragraph>
            <strong>Max Capacity:</strong> {space?.maxCapacity}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              paragraph
            >
              ${space?.baseRentalCost} / day
            </Typography>
            <Button
              variant="contained"
              href={user?.isAuthenticated ? `/events?id=${space.id}` : '/login'}
              color="primary"
            >
              Create Event
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Comments
      </Typography>
      {comments.length > 0 ? (
        <Paper sx={{ p: 2, boxShadow: 3 }}>
          <List>
            {comments.map((comment, index) => (
              <ListItem
                key={comment.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Avatar>
                        {comment.userEmail
                          ? comment.userEmail.charAt(0).toUpperCase()
                          : ''}
                      </Avatar>
                      <Typography variant="body2" color="textSecondary">
                        {comment.userEmail}
                      </Typography>
                    </Box>
                    {user?.username === comment.userEmail && (
                      <Box>
                        {editCommentIndex === index ? (
                          <>
                            <Button
                              onClick={() => handleSaveEditComment(index)}
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ ml: 2 }}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditCommentIndex(null)}
                              variant="outlined"
                              color="secondary"
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <IconButton
                              onClick={() => handleEditComment(index)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteComment(comment.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </Box>
                    )}
                  </Box>
                  <Typography variant="body2" color="textPrimary">
                    {comment.content}
                  </Typography>
                  {editCommentIndex === index && (
                    <TextField
                      value={editedComment}
                      onChange={e => setEditedComment(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography sx={{ color: 'gray' }}>There no comments</Typography>
      )}

      {user?.isAuthenticated && (
        <>
          <TextField
            label="Leave a Comment"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            sx={{ mt: 3 }}
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              textTransform: 'none',
              boxShadow: 2,
              ':hover': {
                backgroundColor: '#9c27b0',
              },
            }}
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </Button>
        </>
      )}

      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this comment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteComment} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpaceDetailPage;
