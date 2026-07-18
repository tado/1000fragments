uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.31;
	vec3 col = mix(vec3(0.040, 0.042, 0.079), vec3(0.021, 0.056, 0.132), clamp(0.5 + p.y * -0.48 + p.x * -0.20, 0.0, 1.0));
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.68;
		float w = 0.14 * sin(p.x * 2.88 + (time * 0.62) * 2.55 + fl * 0.61);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.016, 3.565, 5.114) + fl * 0.82 + (time * 0.62) * 0.82)) * (0.0030 / (ld + 0.0145));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.982, 1.017, 0.951);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
