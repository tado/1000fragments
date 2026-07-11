uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.002, 0.024, 0.047);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.02 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 1.0 + 2.00), sin(ft * 2.0)) * 0.55;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.49)) * (0.0095 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
