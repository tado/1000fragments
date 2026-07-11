uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.040, 0.021, 0.014);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 2.02 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.18 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.10)) * (0.0045 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 2.71 + time * 14.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
