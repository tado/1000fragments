uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec3 col = vec3(0.026, 0.012, 0.017);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.97 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 1.0 + 0.68), sin(ft * 1.0)) * 0.55;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.58)) * (0.0041 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
