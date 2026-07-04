uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.002, 0.008, 0.052);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.49 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.67 + 0.20 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.72)) * (0.0074 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
