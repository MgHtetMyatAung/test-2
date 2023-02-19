import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cards:[],
    changeCards:[]
};

export const cardSlice= createSlice({
    name:'card',
    initialState,
    reducers:{
        ADD_TO_CARD:(state,{payload})=>{
            state.cards.find(item=> item.id === payload.id) ? state.cards= state.cards :state.cards.push({...payload,qty:1});
            state.changeCards.find(item=> item.id === payload.id) ? state.changeCards= state.changeCards :state.changeCards.push({...payload,qty:1});
        },
        REMOVE_CARD:(state,{payload})=>{
            state.cards= state.cards.filter(item=>item.id!==payload.id);
            state.changeCards= state.changeCards.filter(item=>item.id!==payload.id);
        },
        INCREASE_CARD:(state,{payload})=>{
            state.cards= state.cards.map(item=>{
                if(item.id===payload.id){
                    return {...item,qty:item.qty+1};
                }else{
                    return item;
                }
            });
            state.changeCards= state.changeCards.map(item=>{
                if(item.id===payload.id){
                    return {...item,qty:item.qty+1};
                }else{
                    return item;
                }
            })
        },
        DECREASE_CARD:(state,{payload})=>{
            state.cards= state.cards.map(item=>{
                if(item.id===payload.id && item.qty>1){
                    return {...item,qty:item.qty-1};
                }else{
                    return item;
                }
            })
        }
    }
});

export const {ADD_TO_CARD,REMOVE_CARD,INCREASE_CARD,DECREASE_CARD}= cardSlice.actions;

export default cardSlice.reducer;