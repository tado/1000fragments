uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.06; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.40 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.42 * sin(mf + 3.0) + ph), cos(t * 0.56 * cos(mf + 3.0) + ph));
        ms += 0.048 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.35) - 0.5;
	q1 += vec2(0.69, -0.36) * sin(length(q1) * 3.44 - time * 1.94) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d = d1 * d2;
	vec3 col = palette(d * 0.91 + time * 0.18, vec3(0.49, 0.46, 0.44), vec3(0.36, 0.34, 0.37), vec3(1.09, 1.29, 0.88), vec3(0.67, 0.72, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
