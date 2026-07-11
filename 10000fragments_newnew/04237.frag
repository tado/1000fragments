uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.15 * pow(abs(cos(ra * 6.0 + t * 1.08)), 2.08);
    v = sin((rr - pet) * 16.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.44) * p * 22.11;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.39 + time * 0.28, vec3(0.49, 0.60, 0.58), vec3(0.41, 0.31, 0.44), vec3(0.85, 1.11, 1.28), vec3(0.78, 1.00, 0.86)) * v;
	col = fract(col * 2.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
