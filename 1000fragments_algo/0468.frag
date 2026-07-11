uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.26 * vnoise2(p * 5.28 + t * 0.90);
    v = sin(wr * 16.01 - t * 1.79 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.51, t * 2.87)) - 0.5) * 1.29;
    v = exp(-abs(bx) * 10.09) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.32;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2((time * 0.50) * 1.56) * q2;
	q2 = abs(q2);
	float d1 = fieldA(q1, (time * 0.50), 0.0);
	float d2 = fieldB(q2, (time * 0.50), 1.58);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.97 + (time * 0.50) * 0.13, vec3(0.28, 0.23, 0.28), vec3(0.16, 0.15, 0.11), vec3(0.47, 0.82, 0.85), vec3(0.66, 0.39, 0.75));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.50)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 0.978, 0.944) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
