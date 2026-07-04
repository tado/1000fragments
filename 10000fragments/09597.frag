uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.007, 0.020);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.13 - float(ci) * 0.08;
		vec2 cp = cos(ft * 4.0) * 0.54 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.87)) * (0.0047 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 1.89 + time * 12.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
