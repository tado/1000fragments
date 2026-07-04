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
    float pet = 0.35 + 0.20 * pow(abs(cos(ra * 2.0 + t * 2.12)), 1.56);
    v = sin((rr - pet) * 11.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.06) * p * 16.25;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.28 + time * 0.20, vec3(0.43, 0.46, 0.41), vec3(0.49, 0.36, 0.38), vec3(1.06, 1.37, 1.16), vec3(0.42, 0.47, 0.57)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
