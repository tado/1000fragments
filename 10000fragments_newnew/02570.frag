uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.001, 0.049);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.46 - float(ci) * 0.06;
		vec2 cp = cos(ft * 6.0) * 0.62 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.55)) * (0.0052 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.13 * sin(gl_FragCoord.y * 0.89 + time * 15.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
