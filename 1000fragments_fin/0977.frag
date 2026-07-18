uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.37 + (time * 0.81) * 1.33) * 0.07;
	vec3 col = mix(vec3(0.046, 0.047, 0.067), vec3(0.066, 0.025, 0.100), clamp(0.5 + p.y * 0.38 + p.x * 0.08, 0.0, 1.0));
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 1.89;
		float w = 0.10 * sin(p.x * 3.38 + (time * 0.81) * 3.18 + fl * 1.17);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.804, 2.668, 3.532) + fl * 0.72 + (time * 0.81) * 0.89)) * (0.0062 / (ld + 0.0116));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.961, 1.013, 0.941);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
