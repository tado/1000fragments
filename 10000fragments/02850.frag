uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.024, 0.022);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.81 - float(ci) * 0.05;
		vec2 cp = cos(ft * 6.0) * 0.87 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.71)) * (0.0072 / (length(p - cp) + 0.025)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
