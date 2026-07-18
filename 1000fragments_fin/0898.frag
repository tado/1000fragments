uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.87;
	vec3 col = mix(vec3(0.061, 0.059, 0.041), vec3(0.068, 0.041, 0.021), clamp(0.5 + p.y * -0.46 + p.x * 0.15, 0.0, 1.0));
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.80) * 0.93 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 0.25), sin(ft * 1.0)) * 0.51;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(3.475, 5.336, 7.198) + ft * 1.13)) * (0.0116 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 1.01 + (time * 0.80) * 12.83);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.962, 1.012, 0.957);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
