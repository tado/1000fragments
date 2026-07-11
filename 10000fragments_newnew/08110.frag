uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.016, 0.017, 0.035);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.95 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.20 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.09)) * (0.0041 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
