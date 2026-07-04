uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.003, 0.035);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.20 - float(ci) * 0.06;
		vec2 cp = cos(ft * 2.0) * 0.89 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.76)) * (0.0063 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
