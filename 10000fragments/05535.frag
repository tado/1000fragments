uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.015, 0.004, 0.017);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.30 - float(ci) * 0.11;
		vec2 cp = cos(ft * 2.0) * 0.69 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.24)) * (0.0043 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.21 + time * 16.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
