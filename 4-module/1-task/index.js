function makeFriendsList(friends) {
  //*create element ul
  let ul = document.createElement("UL");

  //*create loop cause we need three li
  for (let i = 0; i < 3; i++) {
    //*create element li
    let li = document.createElement("LI");
    //*li text should be friends[index].firstName + " " + friends[index].lastName
    li.textContent = friends[i].firstName + " " + friends[i].lastName;
    //*append li in ul
    ul.appendChild(li);
  }

  //*Return DOM element UL with appended li in it 
  return ul;
}
