uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec3 col = vec3(0.023, 0.008, 0.032);
	for(int ci = 0; ci < 23; ci++){
		float ft = time * 0.66 - float(ci) * 0.08;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.42 + 0.29 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.23)) * (0.0084 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
