uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x = abs(p.x);
	p *= 1.48;
	vec3 col = mix(vec3(0.039, 0.048, 0.057), vec3(0.072, 0.051, 0.078), clamp(0.5 + p.y * 0.55 + p.x * 0.21, 0.0, 1.0));
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.72) * 1.17 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 2.30), sin(ft * 5.0)) * 0.57;
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(1.996, 3.223, 4.451) + ft * 1.62)) * (0.0104 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.013, 0.948, 1.002);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
