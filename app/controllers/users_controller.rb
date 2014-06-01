class UsersController < ApplicationController

	before_filter :authenticate_user_from_token!, :only => [:index, :movies]
	def index
		if reject?(params[:id])
			return permission_denied
		end

		@users = User.where(params.permit(:id, :email))
		if @users
			render status: :ok,
				json: @users.as_json
		else
			render status: :not_found,
				json: "Users not found"
		end
	end

	def movies
		if reject?(params[:id])
			return permission_denied
		end

		@user = User.where(:id => params[:id]).first

		if @user
			render status: :ok,
			json: @user.movies.as_json
		else
			render status: :not_found,
			json: {
				error: "User #{params[:id]} not found"
			}
		end
	end

end