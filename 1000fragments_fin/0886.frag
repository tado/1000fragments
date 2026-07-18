uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = mix(vec3(0.022, 0.028, 0.052), vec3(0.019, 0.043, 0.043), clamp(0.5 + p.y * -0.43 + p.x * 0.05, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.82) * 1.68 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 5.0 + 1.39), sin(ft * 5.0)) * 0.77;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(3.137, 3.875, 4.613) + ft * 1.40)) * (0.0103 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.937, 0.990, 1.033);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
