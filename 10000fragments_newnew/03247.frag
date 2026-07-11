uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.039, 0.051);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.22 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 3.0 + 1.02), sin(ft * 2.0)) * 0.76;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.28)) * (0.0091 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
