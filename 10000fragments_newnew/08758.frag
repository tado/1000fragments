uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	vec3 col = vec3(0.028, 0.004, 0.023);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.01 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.30 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.87)) * (0.0044 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
