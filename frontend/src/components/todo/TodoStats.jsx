import React from 'react';

const TodoStats = ({ todos }) => {
  const total = todos.length;
  const done = todos.filter(todo => todo.isDone).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const getMessage = () => {
    if (percent === 100) return '💯 완벽해요! 오늘 할 일 전부 완료!';
    if (percent >= 80) return '🎉 대단해요! 거의 다 했어요!';
    if (percent >= 50) return '👍 절반 이상 했어요! 조금만 더!';
    if (percent > 0) return '📈 시작이 반이에요! 화이팅!';
    return '📌 오늘의 목표를 시작해보세요!';
  };

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      backgroundColor: '#f1f8e9',
      borderRadius: '8px'
    }}>
      <h4>오늘의 투두 성취율</h4>
      <p>총 {total}개 중 {done}개 완료 ({percent}%)</p>
      <p><strong>{getMessage()}</strong></p>
    </div>
  );
};

export default TodoStats;
