uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.43; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.12 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.23 + vec2(t * 1.35, -t * 0.59) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.98) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 1.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.53));
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.09;
	q2 = rot2(q2.y * -3.57 + time * 0.31) * q2;
	q2 *= 1.0 + 0.25 * sin(time * 1.18);
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.40; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.93);
	float d3 = fieldC(q3, time, 0.61);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.97 + time * 0.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
