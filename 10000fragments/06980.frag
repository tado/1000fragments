uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec3 col = vec3(0.017, 0.039, 0.034);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.77 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 2.0 + 1.76), sin(ft * 1.0)) * 0.67;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.46)) * (0.0108 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
