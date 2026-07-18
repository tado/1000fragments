uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	vec3 col = mix(vec3(0.022, 0.058, 0.040), vec3(0.025, 0.079, 0.072), clamp(0.5 + p.y * 0.56 + p.x * 0.06, 0.0, 1.0));
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.79) * 0.88 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.52 + 0.29 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(4.813, 5.975, 7.138) + ft * 1.48)) * (0.0073 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.922, 0.977, 1.034);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
