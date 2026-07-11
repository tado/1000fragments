uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.96);
    float gsh = hash21(vec2(grow, floor(t * 7.41))) - 0.5;
    float gx = p.x + gsh * 0.85;
    v = sin(gx * 7.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.89));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.53; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.81 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.82));
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.57; q1 = rot2(0.32) * q1; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.12; q2 = rot2(0.37) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.58 + time * 0.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
