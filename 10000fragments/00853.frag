uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.004, 0.025, 0.034);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 0.64 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 3.0 + 0.39), sin(ft * 3.0)) * 0.53;
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.57)) * (0.0050 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
