import React, { useEffect, useRef } from 'react';
import { Table, TableBody } from '@mui/material';
import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net/js/jquery.dataTables.min.js';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import styles from './styles/Datatable.module.scss'

interface DataTableProps {
    data: any[]; 
    columns: any[]; 
}

const DataTableComponent: React.FC<DataTableProps> = ({ data, columns }) => {
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        let dataTable: DataTables.Api | null = null;

        if (tableRef.current) {
            dataTable = $(tableRef.current).DataTable({
                data,
                columns,
                // dom: 't',
                paging: false, 
                info: false,
            });
        }

        return () => {
            if (dataTable) {
                dataTable.destroy();
            }
        };
    }, [data, columns]);

    return (
        <section className={styles.tableSection}>
            <div className={styles.dataTableWrapper}>
                <Table className={styles.tableWrapper}>
                    <TableBody>
                        <tr>
                            <td>
                                <table ref={tableRef} className={styles.table}></table>
                            </td>
                        </tr>
                    </TableBody>
                </Table>
            </div>
        </section>

    );
};

export default DataTableComponent;
