function confirmDelete(event) {
    const userConfirmed = confirm("Are you sure you want to delete this Listing?");
    if (!userConfirmed) {
        event.preventDefault(); // Stops the form from submitting if user clicks Cancel
    }
}