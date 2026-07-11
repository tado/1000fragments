uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.33; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.73 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.12);
    float gsh = hash21(vec2(grow, floor(t * 3.15))) - 0.5;
    float gx = p.x + gsh * 0.85;
    v = sin(gx * 14.93 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.06));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.87) - 0.5;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.57; q1 = rot2(0.32) * q1; }
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.35; q2 = rot2(0.88) * q2; }
	q2 = rot2(time * 1.25) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.21);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.72));
	vec3 col = hue(d * 1.25 + time * 0.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
