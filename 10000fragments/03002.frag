uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.035, 0.006, 0.056);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.60 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 1.0 + 2.57), sin(ft * 2.0)) * 0.72;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.73)) * (0.0064 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
