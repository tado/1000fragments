uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec3 col = vec3(0.028, 0.012, 0.018);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.32 - float(ci) * 0.09;
		vec2 cp = cos(ft * 5.0) * 0.60 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.04)) * (0.0076 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
