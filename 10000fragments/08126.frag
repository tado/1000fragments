uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.012, 0.039, 0.043);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.15 - float(ci) * 0.06;
		vec2 cp = cos(ft * 4.0) * 0.78 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.72)) * (0.0041 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
