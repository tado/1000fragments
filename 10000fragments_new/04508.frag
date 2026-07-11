uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.60; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.42 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.81 + sr * 7.63 - t * 4.43 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.30 - t * 1.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.15; q2 = rot2(2.58) * q2; }
	q2 = rot2(time * -0.60) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d3 = fieldC(q3, time, 0.08);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.48, 0.93, 0.52) + vec3(0.23, 0.10, 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
