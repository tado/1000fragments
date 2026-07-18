uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.77) * 0.33), cos((time * 0.77) * 1.15)) * 0.15;
	p *= 0.94;
	vec3 col = mix(vec3(0.030, 0.061, 0.075), vec3(0.016, 0.075, 0.088), clamp(0.5 + p.y * -0.53 + p.x * -0.27, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.77) * 1.71 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.14 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(4.329, 5.427, 6.525) + ft * 1.34)) * (0.0079 / (length(p - cp) + 0.013)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.000, 0.999, 0.990);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
