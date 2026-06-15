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
    vec2 vp = p * 5.19; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.86 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.24 + t * 0.86 + ph) + sin(p.y * 12.92 - t * 0.86 + ph)
        + sin((p.x + p.y) * 5.59 + t * 0.86 + ph) + sin(length(p) * 9.96 - t * 0.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 2.91 + time * 0.76); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.76 + time * 0.09, vec3(0.44, 0.48, 0.54), vec3(0.42, 0.41, 0.49), vec3(1.28, 1.01, 0.79), vec3(0.19, 0.01, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
