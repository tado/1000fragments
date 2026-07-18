uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p += vec2(sin((time * 0.68) * 0.83), cos((time * 0.68) * 0.98)) * 0.19;
	vec3 col = vec3(0.014, 0.023, 0.039);
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 2.08;
		float w = 0.09 * sin(p.x * 5.94 + (time * 0.68) * 4.88 + fl * 0.56);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.555, 6.203, 7.851) + fl * 0.60 + (time * 0.68) * 1.03)) * (0.0051 / (ld + 0.0112));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.963, 0.996, 0.938);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
