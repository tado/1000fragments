uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.012, 0.043);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 2.15 - float(ci) * 0.11;
		vec2 cp = cos(ft * 3.0) * 0.86 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.99)) * (0.0049 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.60 + time * 11.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
