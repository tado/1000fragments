uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.50 + ga * 2.0 - t * 2.77 + ph);
    v = arm * exp(-gr * 1.01);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.43; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.33 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -2.45 + time * 0.48) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.28));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.80 + time * 0.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
