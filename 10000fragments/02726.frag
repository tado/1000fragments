uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec3 col = vec3(0.033, 0.011, 0.033);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.08 - float(ci) * 0.08;
		vec2 cp = cos(ft * 5.0) * 0.80 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.67)) * (0.0066 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
