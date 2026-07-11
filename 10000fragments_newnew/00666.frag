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
    float wa = sin(p.x * 17.33 + t * 1.28 + ph) * 0.7;
    float wb = sin(p.y * 19.02 - t * 2.88 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.23, t * 0.61)) - 0.5) * 0.83;
    v = exp(-abs(bx) * 10.84) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q1 = rot2(time * 0.31) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.23, 0.33), vec3(0.88, 0.59, 0.46), cc);
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.20 + time * 17.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
