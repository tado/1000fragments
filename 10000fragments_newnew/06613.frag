uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.006, 0.012, 0.040);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.64 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.42 + 0.26 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.95)) * (0.0044 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
