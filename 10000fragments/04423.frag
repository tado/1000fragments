uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	vec3 col = vec3(0.018, 0.014, 0.045);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.73 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.24 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.59)) * (0.0058 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
