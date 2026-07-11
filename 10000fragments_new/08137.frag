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
    float grow = floor(p.y * 19.38);
    float gsh = hash21(vec2(grow, floor(t * 3.73))) - 0.5;
    float gx = p.x + gsh * 0.57;
    v = sin(gx * 9.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.09));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.03; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.04 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.76 + ph), sin(lt * 3.0 + t * 1.33)) * 0.58;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.49) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.52; q1 = rot2(0.45) * q1; }
	q1 = (floor(q1 * 10.6) + 0.5) / 10.6;
	q3.y += sin(q3.x * 4.81 + time * 1.47) * 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d3 = fieldC(q3, time, 0.18);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = vec3(0.91, 0.20, 0.80) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
