uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 4.07 * sin(t * 0.73) + t * 4.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.68; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.88 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.57 + t * 3.18 + ph) * 0.7;
    float wb = sin(p.y * 14.81 - t * 2.14 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.36;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(1.37) * q1;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.36; q2 = rot2(0.86) * q2; }
	q3 = rot2(length(q3) * 3.93 + time * 0.79) * q3;
	q3 = abs(q3) - 0.73;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.25);
	float d3 = fieldC(q3, time, 1.43);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.47));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.79, 0.55, 0.55) + vec3(0.12, 0.13, 0.10);
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
