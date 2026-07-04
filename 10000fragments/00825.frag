uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.024, 0.039);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.73 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 3.0 + 0.48), sin(ft * 4.0)) * 0.53;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.14)) * (0.0065 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
