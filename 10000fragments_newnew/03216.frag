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
    float pet = 0.52 + 0.22 * pow(abs(cos(ra * 6.0 + t * 1.66)), 2.67);
    v = sin((rr - pet) * 20.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.40) * p * 12.41;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.02 + time * 0.16, vec3(0.53, 0.53, 0.40), vec3(0.34, 0.46, 0.49), vec3(1.11, 1.39, 1.26), vec3(0.88, 0.92, 0.75)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
