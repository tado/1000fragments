uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	p = rot2((time * 0.53) * 1.17) * p;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.22 * sin((time * 0.53) * 1.53), -0.19 + 0.15 * cos((time * 0.53) * 0.45));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.32, -0.43)));
	}
	float v = exp(-trap * 4.95);
	vec3 col = palette((v * 1.88) * 1.15 + (time * 0.53) * 0.00, vec3(0.34, 0.34, 0.39), vec3(0.17, 0.15, 0.09), vec3(0.49, 0.72, 0.82), vec3(0.93, 0.75, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 0.992, 0.940) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
