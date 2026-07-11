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
    vec2 vp = p * 6.03; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.92 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.30 * cos(sa * 6.0 + t * 0.95 + ph);
    v = sin((sr - petal) * 11.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 27.2) + 0.5) / 27.2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.87);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.16));
	vec3 col = palette(d * 0.94 + time * 0.02, vec3(0.49, 0.46, 0.60), vec3(0.32, 0.49, 0.39), vec3(0.98, 0.83, 0.97), vec3(0.81, 0.33, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
