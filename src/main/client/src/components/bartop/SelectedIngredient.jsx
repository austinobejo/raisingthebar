import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import "./SelectedIngredient.scss";

export default class SelectedIngredient extends Component {
    constructor(props) {
        super(props);
        this.getIngredientImage = this.getIngredientImage.bind(this);
        this.getSlotImage = this.getSlotImage.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.rotate = this.rotate.bind(this);
        this.rotateBack = this.rotateBack.bind(this);
        this.pour = this.pour.bind(this);
        this.pouring = this.pouring.bind(this);
        this.state = {
            rotation: 0,
            amount: 0,
            volumePoured: 0,
            beingPoured: false,
        }
        
        this.t = undefined;
        this.ounces = true;
    }
    returnStats() {
        if (this.state.selected_ingredient != null) {
            return <p> {this.state.selected_ingredient.name}, {this.state.selected_amount}</p>
        }
    }
    handleDrop(index, event) {
        // this.props.onDragEndSelectedIngredientCallback();
        // callback(index);
    }
    rotate () {
     
        this.setState({
            rotation: 120
        });
    }
    
    rotateBack() {
 
        this.setState({
            rotation: 0
        });
        
    }
    
    onMouseDown() {
        
        
        this.rotate();
        if (this.state.amount == null) {
            this.setState({ amount: 0 })
        }
        this.pouring();
    }
    onMouseUp() {
        clearTimeout(this.t);
        
        if (this.state.amount > 0) {
            
            
            let data = this.props.selected_slot.data;
            let stack = data.actionStack;
            if((data.amount == null)) {
                data.amount = 0;
            }
            let totalAmount = 0;
            for(var i = 0; i < stack.length; i++) {
                // check if it is ingredient or action
                if (stack[i].amount != null) {
                    totalAmount = totalAmount + stack[i].amount;
                }
            
                
            
            }
            
            // total amount in cup currently
            data.amount = totalAmount;
            
            // amount to be poured
            let amountToBePoured = 0.025 * this.state.amount
            console.log(stack)
            console.log(data.amount)
            console.log(this.props.selected_slot)
            
            if(this.props.selected_slot.bar != "action") {
                if ((data.amount + amountToBePoured) < data.glass.volume) {
                // add ingredient if there is enough room
                this.props.addSelectedIngredientToSelectedSlotCallback(this.state.amount)
            } else {
               
                let remainingVolume = data.glass.volume - data.amount;
                
                if (remainingVolume !=0) {
                    // if there is remaining space add the remaining volume
                    this.props.addSelectedIngredientToSelectedSlotCallbackRemaining(remainingVolume)
                } else {
                    // if there is no remaining space add error message
                    
                   
                }
                
            }
            } else {
                this.props.addSelectedIngredientToSelectedSlotCallback(this.state.amount)
            }
                
            
            
            
  
        }
        this.setState({ amount: 0 });
        this.rotateBack();
    }
    
    onMouseClick() {
        console.log(this.state.amount)
        this.props.addSelectedIngredientToSelectedSlotCallback(this.state.amount)
 
    }
    pour() {
        this.setState({ amount: this.state.amount + 1 });

    }
    pouring() {
        this.pour();
        this.t = setTimeout(this.pouring, 100);
    }
    getIngredientImage() {
        const { rotation } =  this.state;
        if (this.props.selected_ingredient != null) {
            
            if(this.props.selected_ingredient.scale == "ounces") {
                this.state.ounces = true;
            } else {
                this.state.ounces = false;
            }
            //console.log(this.state.ounces);
            return <div onMouseDown={this.state.ounces ? this.onMouseDown.bind(this) : null} onMouseUp={this.state.ounces ? this.onMouseUp.bind(this) : this.onMouseClick.bind(this)}> 
                <img style={{transform: `rotate(${rotation}deg)`}}className="top-img" draggable="false" src={"/images/" + (this.props.selected_ingredient.category == "glasses" ? "glasses/" : "ingredients/") + (this.props.selected_ingredient.name).toLowerCase() + ".png"} alt={"Missing Image: " + this.props.selected_ingredient.name} /> </div>


        } else {
            return <div id="tooltip" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                <img className="bottom-img" src="/images/actions/empty_spot.png" alt="empty spot" />
                <span className="tooltiptext">There's nothing in this space!</span>
            </div>
        }
    }
    getSlotImage() {

        if (this.props.selected_slot != null) {
            if (this.props.selected_slot.bar == "quick") {
                var glass = this.props.selected_slot.data.glass;
                var actionBar = this.props.selected_slot.data.actionStack;
                return this.props.renderGlass(glass, actionBar);
            } else if (this.props.selected_slot.bar == "action") {
                var slot = this.props.selected_slot.slot
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
             
                <div className="right">
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

            </div>
        );
    }

}