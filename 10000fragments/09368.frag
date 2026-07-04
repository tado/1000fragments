uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.33;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.52; kp = rot2(1.19) * kp; kp *= 1.16; }
    v = sin(kp.x * 1.19 - t * 4.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.71; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.69 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 3.96 + time * 0.68) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.32, vec3(0.46, 0.51, 0.52), vec3(0.34, 0.38, 0.49), vec3(1.05, 0.87, 0.94), vec3(0.16, 0.89, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
