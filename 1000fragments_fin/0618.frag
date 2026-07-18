uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p *= 2.00;
	p = rot2((time * 0.73) * -0.73) * p;
	vec2 z = p;
	vec2 c = vec2(0.15 + 0.27 * sin((time * 0.73) * 1.00), 0.44 + 0.25 * cos((time * 0.73) * 1.19));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.27);
	float cc = clamp(0.5 + 0.5 * (v * 2.14), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.056, 0.046, 0.073), vec3(0.688, 0.310, 0.140), smoothstep(0.0, 0.57, cc)), vec3(0.987, 0.813, 0.625), smoothstep(0.57, 1.0, cc));
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(1.020, 0.976, 0.938);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
