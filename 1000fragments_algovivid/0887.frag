uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.79) * 0.71), cos((time * 0.79) * 0.93)) * 0.07;
	p.x += p.y * -0.49;
	vec3 col = vec3(0.024, 0.035, 0.024);
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.79) * 0.67 - float(ci) * 0.10;
		vec2 cp = cos(ft * 2.0) * 0.68 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.74, 3.49) + ft * 0.55)) * (0.0058 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.969, 0.991) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
