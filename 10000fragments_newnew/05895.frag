uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.024, 0.004, 0.034);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.43 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 5.0 + 0.73), sin(ft * 1.0)) * 0.68;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.71)) * (0.0101 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
