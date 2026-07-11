uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.68; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.18 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.99);
    float gsh = hash21(vec2(grow, floor(t * 8.81))) - 0.5;
    float gx = p.x + gsh * 0.56;
    v = sin(gx * 19.64 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.47));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.59) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.82 + time * 0.20, vec3(0.48, 0.43, 0.50), vec3(0.36, 0.38, 0.37), vec3(1.39, 1.20, 1.29), vec3(0.87, 0.53, 0.69));
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 2.59 + time * 7.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
