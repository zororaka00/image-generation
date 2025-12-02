import React from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface IdCardProps {
  todo: Todo;
}

const IdCard: React.FC<IdCardProps> = ({ todo }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    fontFamily: 'sans-serif',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle: React.CSSProperties = {
    color: '#333',
    margin: '0 0 10px 0',
  };

  const textStyle: React.CSSProperties = {
    color: '#666',
    margin: '0',
  };

  const statusStyle: React.CSSProperties = {
    color: todo.completed ? 'green' : 'red',
    margin: '0',
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>ID: {todo.id}</h2>
      <p style={textStyle}>Title: {todo.title}</p>
      <p style={statusStyle}>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default IdCard;
