uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2((time * 0.77) * -0.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.07 * sin((time * 0.77) * 1.98), 0.02 + 0.07 * cos((time * 0.77) * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.10);
	float cc = clamp(0.5 + 0.5 * (v * 1.72), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.059, 0.076, 0.036), vec3(0.716, 0.314, 0.146), smoothstep(0.0, 0.49, cc)), vec3(0.978, 0.813, 0.638), smoothstep(0.49, 1.0, cc));
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.008, 1.005, 0.993);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
