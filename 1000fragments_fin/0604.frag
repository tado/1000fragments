uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.55;
	p *= 1.06;
	p = rot2((time * 0.75) * -1.01) * p;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.17 * sin((time * 0.75) * 0.72), -0.47 + 0.28 * cos((time * 0.75) * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.05, -0.07)));
	}
	float v = exp(-trap * 2.41);
	vec3 col = palette((v * 3.96) * 0.89 + (time * 0.75) * 0.04, vec3(0.49, 0.23, 0.13), vec3(0.42, 0.28, 0.19), vec3(1.04, 0.98, 1.03), vec3(-0.01, 0.13, 0.19));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.019, 0.971, 0.996);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
