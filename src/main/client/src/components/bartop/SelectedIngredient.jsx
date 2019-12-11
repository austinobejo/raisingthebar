import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./SelectedIngredient.scss";
 
export default class SelectedIngredient extends Component {
    constructor(props) {
        super(props);
        this.getIngredientImage = this.getIngredientImage.bind(this);
        this.getSlotImage = this.getSlotImage.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this)
        this.state = {
            rotate: false
        }
 
    }
    handleDrop(index, event) {
        // this.props.onDragEndSelectedIngredientCallback();
        // callback(index);
    }
    rotateFunction() {
        this.setState({ rotate: true });
 
    }
    onMouseDown() {
        this.props.onMouseDown();
    }
    onMouseUp() {
        this.props.onMouseUp();
    }
    getIngredientImage() {
        if (this.props.selected_ingredient != null) {
            //if (!this.state.rotate ){
            return <div onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}> <img className="top-img"  draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected_ingredient.name + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} /> </div>
            // }
            /*else {
            return <div> <img  className="rotImg" onClick={this.rotateFunction.bind(this)} draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + this.props.selected_ingredient.name + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} /> </div>
 
            }*/
            {/* <span className="tooltiptext" >
                    {this.props.inventory[index].actionStack.map((item) => {
                        return (<p key={item.name}>{item.name}</p>);
                    })}
                </span> */}
 
        } else {
            return <div id="tooltip" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
                <span className="tooltiptext">There's nothing in this space!</span>
            </div>
        }
    }
    getSlotImage() {
 
        if (this.props.selected_bar != null) {
            if (this.props.selected_bar.bar == "quick") {
                var glass = this.props.selected_bar.data.glass;
                var actionBar = this.props.selected_bar.data.actionStack;
                var callback = this.props.renderGlass;
                return callback(glass, actionBar);
            } else if (this.props.selected_bar.bar == "action") {
                var slot = this.props.selected_bar.slot
                return this.props.renderActionBarItem(slot)
            }
 
        } else {
            return <div id="tooltip">
                <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
                <span className="tooltiptext">There's nothing in this space!</span>
            </div>
        }
    }
    render() {
        return (
            <div className="selected_ingredient">
                <div onDrop={this.handleDrop.bind(this, 0)} onDragOver={(e) => e.preventDefault()} draggable>
                    {
                        this.getIngredientImage()
                    }
                </div>
                <div className="selected-slot" onDrop={this.handleDrop.bind(this, 1)} onDragOver={(e) => e.preventDefault()} draggable>
                    {
                        this.getSlotImage()
                    }
                </div>
            </div>
        );
    }
 
}