uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	vec3 col = vec3(0.011, 0.023, 0.045);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 0.86 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.69 + 0.30 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.53)) * (0.0081 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
