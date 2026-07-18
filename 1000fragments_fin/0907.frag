uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 col = mix(vec3(0.063, 0.040, 0.048), vec3(0.041, 0.058, 0.017), clamp(0.5 + p.y * -0.38 + p.x * 0.01, 0.0, 1.0));
	for(int ci = 0; ci < 23; ci++){
		float ft = (time * 0.79) * 0.75 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.56 + 0.13 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 23.0;
		col += (0.5 + 0.5 * cos(vec3(2.701, 4.496, 6.292) + ft * 0.72)) * (0.0112 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.055, 1.012, 0.916);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
