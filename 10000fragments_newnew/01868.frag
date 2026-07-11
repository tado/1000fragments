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

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.39, t * 2.14)) - 0.5) * 0.96;
    v = exp(-abs(bx) * 11.13) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.12 + t * 0.70) - 0.5) * 2.0;
    v = sin((p.y * 7.19 + zx * 1.36 + t * 1.52) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.65) * q1;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.71));
	q2 = sin(q2 * 1.96 + time * 1.54) * 1.49;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.61);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.80 + time * 0.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
