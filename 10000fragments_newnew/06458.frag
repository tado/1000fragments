uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.012, 0.054);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.72 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 4.0 + 0.88), sin(ft * 4.0)) * 0.90;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.62)) * (0.0092 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
