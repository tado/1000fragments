uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 1.14 + (time * 0.84) * 1.00) * 0.11;
	vec3 col = mix(vec3(0.024, 0.054, 0.059), vec3(0.040, 0.041, 0.069), clamp(0.5 + p.y * 0.26 + p.x * 0.18, 0.0, 1.0));
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.84) * 0.91 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 2.0 + 0.37), sin(ft * 5.0)) * 0.53;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.643, 2.687, 4.731) + ft * 1.51)) * (0.0092 / (length(p - cp) + 0.017)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.055, 0.998, 0.941);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
