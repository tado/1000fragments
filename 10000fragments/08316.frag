uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.030, 0.036, 0.030);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.47 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 4.0 + 1.73), sin(ft * 1.0)) * 0.79;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.74)) * (0.0066 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
