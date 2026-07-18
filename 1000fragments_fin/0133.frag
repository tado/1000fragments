uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.36 + 0.21 * pow(abs(cos(ra * 5.0 + t * 1.65)), 0.72);
    v = sin((rr - pet) * 9.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x += p.y * -0.48;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = rot2(length(p) * -1.24 + (time * 0.78) * 1.44) * p;
	float d = field(p, (time * 0.78), 0.0);
	vec3 col = palette(d * 0.44 + (time * 0.78) * 0.10, vec3(0.29, 0.37, 0.26), vec3(0.23, 0.30, 0.18), vec3(1.00, 1.05, 0.99), vec3(0.10, 0.23, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.013, 1.006, 1.004);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
