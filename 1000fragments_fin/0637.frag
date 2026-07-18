uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.01;
	p = rot2((time * 0.63) * -1.32) * p;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.23 * sin((time * 0.63) * 1.74), -0.56 + 0.22 * cos((time * 0.63) * 0.80));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.46);
	float cc = clamp(0.5 + 0.5 * (v * 2.51), 0.0, 1.0);
	vec3 col = mix(vec3(0.043, 0.069, 0.083), vec3(0.939, 0.886, 0.864), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.981, 1.006, 0.936);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
