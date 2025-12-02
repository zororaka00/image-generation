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
    width: '1200px',
    height: '630px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    boxSizing: 'border-box',
    textAlign: 'center'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '60px',
    margin: '0 0 20px 0',
    fontWeight: 'bold',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '36px',
    margin: '0 0 30px 0',
    maxWidth: '80%'
  };

  const statusStyle: React.CSSProperties = {
    fontSize: '40px',
    fontWeight: 'bold',
    color: todo.completed ? '#4caf50' : '#f44336',
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: todo.completed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
  };

  return (
    <div style={cardStyle}>
      <h1 style={titleStyle}>Task #{todo.id}</h1>
      <p style={textStyle}>{todo.title}</p>
      <div style={statusStyle}>
        {todo.completed ? 'Completed' : 'Pending'}
      </div>
    </div>
  );
};

export default IdCard;
