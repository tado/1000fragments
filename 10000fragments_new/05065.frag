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
    vec2 wq = vec2(vnoise2(p * 3.10 + ph), vnoise2(p * 3.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.10 + 2.10 * wq + vec2(1.7, 9.2) + t * 0.61),
                   vnoise2(p * 3.10 + 3.12 * wq + vec2(8.3, 2.8) - t * 0.36));
    v = vnoise2(p * 3.10 + 3.57 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.30 * cos(sa * 7.0 + t * 2.36 + ph);
    v = sin((sr - petal) * 16.96);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.96 * sin(mf + 3.0) + ph), cos(t * 1.03 * cos(mf + 3.0) + ph));
        ms += 0.066 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.54; q1 = rot2(0.98) * q1; }
	q1 = (floor(q1 * 9.6) + 0.5) / 9.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d3 = fieldC(q3, time, 1.58);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.87 + time * 0.17);
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
