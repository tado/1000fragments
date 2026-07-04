uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.034, 0.032, 0.047);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.47 - float(ci) * 0.07;
		vec2 cp = cos(ft * 4.0) * 0.77 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.36)) * (0.0056 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
