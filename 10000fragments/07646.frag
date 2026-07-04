uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.03, t * 2.90)) - 0.5) * 1.48;
    v = exp(-abs(bx) * 7.68) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.28 + t * 0.89) - 0.5) * 2.0;
    v = sin((p.y * 5.31 + zx * 1.01 + t * 1.76) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.18 * sin(time * 1.30);
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.46; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.28));
	vec3 col = vec3(0.54, 0.74, 0.43) * (0.17 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
