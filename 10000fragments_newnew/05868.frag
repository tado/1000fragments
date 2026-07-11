uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.000, 0.001, 0.035);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.71 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 3.0 + 2.36), sin(ft * 1.0)) * 0.61;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.32)) * (0.0101 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
