import React from 'react';
import styles from './styles/Success.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Layout from './Layout';

const Success: React.FC = () => {
  const recordDetails = useSelector((state: RootState) => state.record);
  console.log('record', recordDetails)
  return (
    <Layout>
      <div className={styles.successContainer}>
        <h2 className={styles.successHeader}>Form Submitted Successfully!</h2>
      </div>
    </Layout>
  );
};

export default Success;