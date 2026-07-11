uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.34 * pow(abs(cos(ra * 7.0 + t * 1.89)), 1.88);
    v = sin((rr - pet) * 18.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.72;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.06 * sin(t * 3.36 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2(p.y * 3.10 + (time * 0.80) * 0.94) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.97;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(0.97) * p; }
	float d1 = field(p, (time * 0.80), 0.0);
	float d2 = field2(p, (time * 0.80), 0.29);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + (time * 0.80) * 0.11, vec3(0.23, 0.26, 0.22), vec3(0.21, 0.24, 0.20), vec3(0.66, 0.59, 0.50), vec3(0.82, 0.90, 0.04));
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.969, 1.025) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
