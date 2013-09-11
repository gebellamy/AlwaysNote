class ContributionsController < ApplicationController
  
  def create
    shares = params[:shares].split(",")
    shares.each do |share|
      if share.include?("@")
        @user = User.find_by_base_email(share.strip)
      else
        @user = User.find_by_username(share.strip)
      end
      if @user
        @contribution = Contribution.create({ 
          'user_id'  => @user.id,
          'notebook_id'  => params[:notebook_id]
          })
      end
    end
    render :text => "Success"
  end
  
end
