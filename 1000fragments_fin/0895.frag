uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.53 + (time * 0.85) * 0.87) * 0.19;
	p *= 1.27;
	vec3 col = mix(vec3(0.020, 0.067, 0.085), vec3(0.036, 0.059, 0.104), clamp(0.5 + p.y * 0.04 + p.x * -0.13, 0.0, 1.0));
	for(int ci = 0; ci < 16; ci++){
		float ft = (time * 0.85) * 1.24 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.30 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.219, 1.885, 3.551) + ft * 1.54)) * (0.0055 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 1.72 + (time * 0.85) * 4.97);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.938, 0.997, 1.060);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
