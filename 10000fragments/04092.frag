uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.015, 0.008, 0.046);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.19 - float(ci) * 0.11;
		vec2 cp = cos(ft * 2.0) * 0.54 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.55)) * (0.0120 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
