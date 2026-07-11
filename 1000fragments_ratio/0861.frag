uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.58) * 0.77), cos((time * 0.58) * 0.92)) * 0.21;
	p.y += sin(p.x * 1.47 + (time * 0.58) * 0.57) * 0.15;
	vec3 col = vec3(0.032, 0.008, 0.052);
	for(int ci = 0; ci < 26; ci++){
		float ft = (time * 0.58) * 1.78 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.15 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.68, 3.36) + ft * 1.44)) * (0.0103 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.962, 1.016) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
