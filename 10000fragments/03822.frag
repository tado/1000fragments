uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.93; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.85 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.13;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.66) * kp; kp *= 1.16; }
    v = sin(kp.y * 2.03 - t * 1.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.16 * sin(time * 1.70);
	q1 = abs(q1);
	q2 = rot2(q2.y * 3.32 + time * 1.04) * q2;
	q2.x += sin(q2.y * 4.52 + time * 1.56) * 0.35;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = max(d1, d2);
	vec3 col = vec3(0.66, 0.84, 0.17) * (0.07 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
