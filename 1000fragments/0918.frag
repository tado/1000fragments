uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.010, 0.037, 0.048);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.25 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 3.0 + 1.08), sin(ft * 1.0)) * 0.77;
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.00)) * (0.0072 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
