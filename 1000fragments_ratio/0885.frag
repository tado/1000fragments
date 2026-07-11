uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.64 + (time * 0.57) * 0.76) * 0.15;
	p *= 1.13;
	vec3 col = vec3(0.018, 0.006, 0.014);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.57) * 1.79 - float(ci) * 0.08;
		vec2 cp = cos(ft * 3.0) * 0.62 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.73, 3.46) + ft * 1.60)) * (0.0043 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(0.973, 1.008, 0.930) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
