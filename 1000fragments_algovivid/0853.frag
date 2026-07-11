uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.45;
	p.y += sin(p.x * 1.40 + (time * 0.55) * 1.04) * 0.19;
	p *= 0.84;
	vec3 col = vec3(0.035, 0.030, 0.041);
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.55) * 0.88 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 4.0 + 1.89), sin(ft * 3.0)) * 0.75;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.44, 2.88) + ft * 0.86)) * (0.0043 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.953, 0.993, 0.935) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
