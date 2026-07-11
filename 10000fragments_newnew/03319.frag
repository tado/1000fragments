uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec3 col = vec3(0.040, 0.035, 0.006);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 1.62 - float(ci) * 0.09;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.26 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.16)) * (0.0050 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
