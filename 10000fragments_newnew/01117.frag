uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.016, 0.028);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.89 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 1.0 + 0.14), sin(ft * 1.0)) * 0.86;
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.09)) * (0.0051 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.89 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
