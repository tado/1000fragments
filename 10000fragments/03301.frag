uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.81; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.96 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 1.39 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.47); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.54);
    float gsh = hash21(vec2(grow, floor(t * 5.44))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 15.52 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.79));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(length(q2) * 1.97 + time * 1.18) * q2;
	q3 = (floor(q3 * 24.1) + 0.5) / 24.1;
	for(int fo = 0; fo < 3; fo++){ q3 = abs(q3) - 0.37; q3 = rot2(1.11) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.24);
	float d3 = fieldC(q3, time, 1.00);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.27, 1.36, 1.46) + vec3(0.05, 0.24, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
