import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setIsPortfolio } from "../../gameSlice";

export default function PortfolioRedirect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setIsPortfolio(true));
        navigate('/');
    }, []);
}