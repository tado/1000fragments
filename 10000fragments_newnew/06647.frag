uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.006, 0.044);
	for(int ci = 0; ci < 21; ci++){
		float ft = time * 2.11 - float(ci) * 0.04;
		vec2 cp = cos(ft * 4.0) * 0.77 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.79)) * (0.0079 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
