uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.36 + (time * 0.84) * 1.09) * 0.12;
	p *= 1.56;
	p *= 1.86;
	p = rot2((time * 0.84) * 1.45) * p;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.19 * sin((time * 0.84) * 0.63), 0.33 + 0.26 * cos((time * 0.84) * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.49);
	float cc = clamp(0.5 + 0.5 * (v * 2.53), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.005, 0.038, 0.096), vec3(0.138, 0.424, 0.741), smoothstep(0.0, 0.49, cc)), vec3(0.868, 0.951, 1.000), smoothstep(0.49, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.023, 0.982, 0.943);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
