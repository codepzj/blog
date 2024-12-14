utils.jq(() => {
    $(function () {
      const els = document.getElementsByClassName('ds-artalk');
      for (var i = 0; i < els.length; i++) {
        const el = els[i];
        const limit = parseInt(el.getAttribute('limit')) || 10;
  
        const api = el.getAttribute('api') + '&limit=' + limit;
        if (api == null) {
          continue;
        }
        utils.request(el, api, function (data) {
          data = data.data || [];
          data.forEach((item, i) => {
            var cell = '<div class="timenode" index="' + i + '">';
            cell += '<div class="header">';
            cell += '<div class="user-info">';
            cell += '<img src="https://cravatar.cn/avatar/' + (item.email_encrypted) + '?d=mp&s=240">';
            cell += '<span>' + item.nick + '</span>';
            cell += '</div>';
            cell += '<span>' + new Date(item.date).toLocaleString() + '</span>';
            cell += '</div>';
            cell += '<div class="body" style="display:inline-block" onclick="window.open(\'' + item.page_url + '#atk-comment-' + item.id + '\', \'_blank\');">';
            cell += item.content_marked;
            cell += '</div>';
            cell += '</div>';
            $(el).append(cell);
          });
        });
      }
    });
  });
  