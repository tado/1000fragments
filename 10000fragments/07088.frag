uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.024, 0.016, 0.058);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.74 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 2.0 + 0.12), sin(ft * 1.0)) * 0.79;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.25)) * (0.0057 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
