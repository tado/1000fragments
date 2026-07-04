uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	vec3 col = vec3(0.018, 0.013, 0.053);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.86 - float(ci) * 0.04;
		vec2 cp = vec2(sin(ft * 4.0 + 0.99), sin(ft * 3.0)) * 0.80;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.81)) * (0.0061 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
