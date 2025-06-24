import React, { useEffect, useState } from 'react';
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";

type EvaluationItem = {
    label: string;
    score: number;
};

const TradeEvaluationCard: React.FC = () => {
    const { tradeRows } = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();

    const [entryExitData, setEntryExitData] = useState<EvaluationItem[]>([]);
    const [emotionData, setEmotionData] = useState<EvaluationItem[]>([]);

    const fetchData = async () => {
        try {
            const json = await fetchTradeResults();
            setEntryExitData(json['entry_exit_data'] || []);
            setEmotionData(json['emotion_data'] || []);
        } catch (err) {
            console.error('Error fetching trade evaluation data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tradeRows]);

    const totalScore =
        entryExitData.reduce((acc, item) => acc + item.score, 0) +
        emotionData.reduce((acc, item) => acc + item.score, 0);

    const renderRow = (item: EvaluationItem) => (
        <tr key={item.label}>
            <td>{item.label}</td>
            <td className={`fw-bold text-end ${item.score > 0 ? 'text-success' : item.score < 0 ? 'text-danger' : ''}`}>
                {item.score}
            </td>
        </tr>
    );

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0 text-uppercase text-secondary">Trade Evaluation</h5>
                    <div className="text-end">
                        <div className="small text-muted">Total Cum. Score:</div>
                        <div className={`fw-bold fs-5 ${totalScore > 0 ? 'text-success' : totalScore < 0 ? 'text-danger' : ''}`}>
                            {totalScore}
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Entry/Exit */}
                    <div className="col-6">
                        <h6 className="text-uppercase small text-muted border-bottom pb-1 mb-2">Entry/Exit</h6>
                        <table className="table table-borderless table-sm mb-0">
                            <tbody>
                            {entryExitData.map(renderRow)}
                            </tbody>
                        </table>
                    </div>

                    {/* Emotion */}
                    <div className="col-6">
                        <h6 className="text-uppercase small text-muted border-bottom pb-1 mb-2">Emotion</h6>
                        <table className="table table-borderless table-sm mb-0">
                            <tbody>
                            {emotionData.map(renderRow)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3 small text-muted">
                    <div>Evaluated 26% of total trades</div>
                    <div>Evaluated 26% of total trades</div>
                </div>
            </div>
        </div>
    );
};

export default TradeEvaluationCard;
