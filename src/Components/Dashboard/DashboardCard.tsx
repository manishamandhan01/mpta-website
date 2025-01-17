// @flow
import * as React from 'react';

type Props = {

};
export const DashboardCard = (props: Props) => {
    return (
        <div>
            <div className="card-container">
                <div className="dashboard-card">
                    <h1>Balance (?)</h1>
                    <div className="amounts">
                        <p>$117.34k</p>
                        <p>$117.34k</p>
                    </div>
                </div>
                <h2 className="percentage">17.46%</h2>
            </div>

        </div>
    );
};