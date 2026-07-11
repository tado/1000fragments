uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.74 + ph), sin(lt * 5.0 + t * 1.30)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.62) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.61; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.91 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.22 * pow(abs(cos(ra * 5.0 + t * 0.91)), 2.81);
    v = sin((rr - pet) * 16.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * 2.22 + time * 0.36) * q2;
	q3 = rot2(1.38) * q3;
	q3 = (floor(q3 * 28.8) + 0.5) / 28.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d3 = fieldC(q3, time, 0.74);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.63 + time * 0.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
