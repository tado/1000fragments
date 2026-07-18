uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = rot2((time * 0.88) * -0.62) * p;
	vec2 z = p;
	vec2 c = vec2(0.27 + 0.28 * sin((time * 0.88) * 1.39), -0.55 + 0.16 * cos((time * 0.88) * 1.03));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.09);
	float cc = clamp(0.5 + 0.5 * (v * 2.87), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.023, 0.038, 0.055), vec3(0.245, 0.310, 0.768), smoothstep(0.0, 0.53, cc)), vec3(0.627, 0.931, 1.000), smoothstep(0.53, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.014, 0.953, 1.002);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
