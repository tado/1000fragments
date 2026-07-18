uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.83;
	vec3 col = mix(vec3(0.017, 0.059, 0.078), vec3(0.020, 0.095, 0.076), clamp(0.5 + p.y * -0.40 + p.x * -0.02, 0.0, 1.0));
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.86) * 1.96 - float(ci) * 0.12;
		vec2 cp = cos(ft * 5.0) * 0.82 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(1.228, 3.147, 5.066) + ft * 1.96)) * (0.0084 / (length(p - cp) + 0.030)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.968, 0.999, 0.948);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
