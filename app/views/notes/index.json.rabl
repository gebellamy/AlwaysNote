collection @notes

attributes :body, :notebook_id, :id, :owner_id, :title, :updated_at, :created_at

child :tags do 
	attributes :title, :id
end