uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.42 + sr * 13.22 - t * 3.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.14; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.27 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p *= 1.29;
	p = fract(p * 2.01) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.22);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.21 + time * 0.19, vec3(0.59, 0.43, 0.50), vec3(0.31, 0.42, 0.49), vec3(1.10, 1.28, 1.34), vec3(0.45, 0.60, 0.69));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
