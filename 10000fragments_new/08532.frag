uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.49 + ph), sin(lt * 2.0 + t * 1.19)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.58) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.87);
    float gsh = hash21(vec2(grow, floor(t * 2.47))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 17.00 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.14));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.02; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.68 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.87, length(q1) * 5.90 - time * 0.56); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.38);
	float d3 = fieldC(q3, time, 1.45);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.89, 0.21, 0.47) * (0.07 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
