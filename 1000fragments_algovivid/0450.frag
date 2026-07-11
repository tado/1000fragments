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
    vec2 cq = p * 14.42 + vec2(t * 2.36, -t * 0.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.03, t * 2.28)) - 0.5) * 1.24;
    v = exp(-abs(bx) * 8.42) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.49 * sin(mf + 3.0) + ph), cos(t * 2.05 * cos(mf + 3.0) + ph));
        ms += 0.036 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.35 + (time * 0.81) * 0.74) * 0.11;
	p *= 1.68;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.40) - 0.5;
	q1 *= 1.39;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.59; q2 = rot2(1.69) * q2; }
	q2 *= 1.0 + 0.14 * sin((time * 0.81) * 3.69);
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.12;
	q3 *= 1.0 + 0.32 * sin((time * 0.81) * 4.76);
	float d1 = fieldA(q1, (time * 0.81), 0.0);
	float d2 = fieldB(q2, (time * 0.81), 1.94);
	float d3 = fieldC(q3, (time * 0.81), 1.78);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.69, 0.65, 0.76) + vec3(0.04, 0.08, 0.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(1.035, 0.972, 0.937) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
