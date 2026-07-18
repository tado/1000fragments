uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.52;
	p *= 1.16;
	p = rot2((time * 0.83) * 0.80) * p;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.13 * sin((time * 0.83) * 1.61), -0.34 + 0.30 * cos((time * 0.83) * 0.63));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.45, -0.49)));
	}
	float v = exp(-trap * 4.46);
	float cc = clamp(0.5 + 0.5 * (v * 3.28), 0.0, 1.0);
	vec3 col = mix(vec3(0.042, 0.073, 0.093), vec3(0.792, 0.708, 0.978), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.008, 0.987, 0.986);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
