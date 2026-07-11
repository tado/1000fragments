uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.028, 0.004, 0.049);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.75 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 1.47), sin(ft * 5.0)) * 0.74;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.57)) * (0.0119 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
