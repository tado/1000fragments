uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.010, 0.052);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.14 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.58 + 0.15 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.67)) * (0.0068 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
