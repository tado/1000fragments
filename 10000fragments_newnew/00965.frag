uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.034, 0.016, 0.006);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.71 - float(ci) * 0.05;
		vec2 cp = cos(ft * 5.0) * 0.88 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.24)) * (0.0069 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.62 + time * 15.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
