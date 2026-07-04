uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	vec3 col = vec3(0.010, 0.003, 0.020);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 1.54 - float(ci) * 0.10;
		vec2 cp = cos(ft * 4.0) * 0.61 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.55)) * (0.0093 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
