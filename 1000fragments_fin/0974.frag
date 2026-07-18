uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = mix(vec3(0.039, 0.042, 0.075), vec3(0.022, 0.065, 0.076), clamp(0.5 + p.y * 0.61 + p.x * -0.18, 0.0, 1.0));
	for(int li = 0; li < 17; li++){
		float fl = float(li);
		float fy = (fl / 17.0 - 0.5) * 1.94;
		float w = 0.17 * sin(p.x * 7.42 + (time * 0.60) * 4.53 + fl * 0.67) * exp(-p.x * p.x * 1.78);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.951, 7.255, 8.559) + fl * 0.68 + (time * 0.60) * 0.44)) * (0.0042 / (ld + 0.0141));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.010, 0.982, 0.958);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
