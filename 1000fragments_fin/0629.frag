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
	p.x = abs(p.x) - 0.26;
	p += vec2(sin((time * 0.72) * 0.97), cos((time * 0.72) * 0.36)) * 0.15;
	p *= 1.81;
	p = rot2((time * 0.72) * -0.40) * p;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.07 * sin((time * 0.72) * 1.96), 0.14 + 0.26 * cos((time * 0.72) * 1.00));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.28);
	vec3 col = palette((v * 2.54) * 1.04 + (time * 0.72) * 0.21, vec3(0.45, 0.38, 0.37), vec3(0.32, 0.26, 0.26), vec3(1.05, 1.03, 0.65), vec3(0.01, 0.24, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.028, 0.971, 0.954);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
