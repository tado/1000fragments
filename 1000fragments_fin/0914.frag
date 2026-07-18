uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.87 + (time * 0.60) * 1.42) * 0.13;
	p *= 1.52;
	vec3 col = vec3(0.025, 0.015, 0.015);
	for(int ci = 0; ci < 19; ci++){
		float ft = (time * 0.60) * 1.69 - float(ci) * 0.06;
		vec2 cp = cos(ft * 4.0) * 0.78 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(3.958, 5.971, 7.985) + ft * 1.21)) * (0.0058 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.933, 0.999, 1.047);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
