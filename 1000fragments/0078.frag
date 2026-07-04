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
    float wr = length(p) + 0.27 * vnoise2(p * 2.51 + t * 1.01);
    v = sin(wr * 18.23 - t * 3.08 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.07;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.74; kp = rot2(0.58) * kp; kp *= 1.21; }
    v = sin(kp.x * 3.54 - t * 1.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.00));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.87);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.15, 0.47), vec3(0.76, 0.65, 0.58), cc);
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
