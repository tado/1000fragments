uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.54;
	vec3 col = vec3(0.009, 0.037, 0.046);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.60) * 1.87 - float(ci) * 0.10;
		vec2 cp = cos(ft * 6.0) * 0.58 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.74, 1.47) + ft * 0.62)) * (0.0105 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.011, 0.937) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
