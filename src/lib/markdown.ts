export function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^```[\w]*\n([\s\S]*?)^```/gm, '<pre><code>$1</code></pre>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    })
    .replace(/(<tr>[\s\S]+?<\/tr>)/g, '<table>$1</table>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|l|t|b|p])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/\$\$([\s\S]+?)\$\$/g, '<code class="math">$1</code>')
}
