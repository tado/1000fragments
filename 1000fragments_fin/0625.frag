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
	p += vec2(sin((time * 0.88) * 0.68), cos((time * 0.88) * 0.58)) * 0.23;
	p *= 1.02;
	p = rot2((time * 0.88) * 0.52) * p;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.09 * sin((time * 0.88) * 1.15), 0.36 + 0.12 * cos((time * 0.88) * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.69);
	vec3 col = palette((v * 1.88) * 1.19 + (time * 0.88) * 0.17, vec3(0.18, 0.35, 0.46), vec3(0.14, 0.29, 0.30), vec3(0.97, 1.05, 0.99), vec3(0.56, 0.48, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.990, 1.024, 0.935);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
