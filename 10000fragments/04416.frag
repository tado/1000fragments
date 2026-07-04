uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.012, 0.007, 0.028);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.71 - float(ci) * 0.05;
		vec2 cp = cos(ft * 6.0) * 0.85 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.01)) * (0.0081 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
