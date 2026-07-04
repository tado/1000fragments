uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.018, 0.015, 0.033);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 0.62 - float(ci) * 0.06;
		vec2 cp = cos(ft * 4.0) * 0.75 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.39)) * (0.0052 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
