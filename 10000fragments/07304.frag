uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.009, 0.026, 0.036);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.65 - float(ci) * 0.05;
		vec2 cp = cos(ft * 4.0) * 0.69 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.85)) * (0.0110 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
