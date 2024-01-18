import React, { ReactNode } from 'react';
import DataTableComponent from './Datatable';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { AppBar, Toolbar, Typography } from '@mui/material';
import styles from './styles/Layout.module.scss';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const recordDetails = useSelector((state: RootState) => {
        console.log(state);
        return state.record.records;
    })

    const columns = [
        { title: 'Name', data: 'name' },
        { title: 'Age', data: 'age' },
        { title: 'Sex', data: 'sex' },
        { title: 'Mobile', data: 'mobile' },
        { title: 'GovID Type', data: 'govIdType' },
        { title: 'GovID', data: 'govId' },
    ];

    const navigate = useNavigate()
    return (
        <div style={{ margin: "0 auto" }}>
            <AppBar position="static" className={styles.appBar}>
                
                    <Typography variant="h5" className={styles.title} onClick={()=> navigate('/')}>
                        App Form
                    </Typography>
                
            </AppBar>
            <div>{children}</div>
            <DataTableComponent data={recordDetails} columns={columns} />
        </div>
    );
};

export default Layout;
