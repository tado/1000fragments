uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.99 + t * 4.34 + ph) + sin(p.y * 8.46 - t * 4.34 + ph)
        + sin((p.x + p.y) * 6.54 + t * 4.34 + ph) + sin(length(p) * 12.64 - t * 4.34 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 9.63 - t * 3.32 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 33.66 - t * 6.94 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.70; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.20 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -1.05) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.37, length(q1) * 3.05 - time * 0.83); }
	q3 = fract(q3 * 1.96) - 0.5;
	{ float fr = length(q3); q3 *= 1.0 + -0.64 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d3 = fieldC(q3, time, 1.80);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.30, 1.42, 0.52) + vec3(0.22, 0.06, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
