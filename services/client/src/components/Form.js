import React from 'react';

export default ({formData,formType, handleFormChange,handleUsersFormSubmit})=>(
    <div>
        <h1 className="title is-1">{formType}</h1>
        <hr/><br/>
        <form onSubmit={(event)=>handleUsersFormSubmit(event)}>
            {formType === 'Register' &&
            <div className="field">
                <input
                name="username"
                className="input is-medium"
                type="text"
                placeholder="Enter a username"
                required 
                value={formData.username}
                onChange={handleFormChange}
                />
            </div>
            }
            <div className="field">
                <input
                    name="email"
                    className="input is-medium"
                    type="email"
                    placeholder="Enter an email address"
                    required 
                    value={formData.email}
                    onChange={handleFormChange}
                />
            </div>
            <div className="field">
                <input
                    name="password"
                    className="input is-medium"
                    type="password"
                    placeholder="Enter a password"
                    required 
                    value={formData.password}
                    onChange={handleFormChange}
                />
            </div>
            <input 
            type="submit"
            className="button is-primary is-medium is-fullwidth"
            value="Submit"
            />
        </form>
    </div>
)