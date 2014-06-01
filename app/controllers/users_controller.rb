class UsersController < ApplicationController

	def index
		@users = User.where(params.permit(:id, :email))
		if @users
			render status: :ok,
				json: @users.as_json
		else
			render status: :not_found,
				json: "Users not found"
		end
	end

end