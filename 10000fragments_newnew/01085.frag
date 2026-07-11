uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.011, 0.034);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.29 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.49 + 0.15 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.78)) * (0.0067 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
