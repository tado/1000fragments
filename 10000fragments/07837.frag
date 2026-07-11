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

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.41 + t * 4.82 + ph) + sin(p.y * 14.54 - t * 4.43 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.84; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.38 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.32 + time * 0.33) * p;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 4.63 - time * 0.27); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.21, lr * 1.13 + time * 0.59); }
	p = rot2(time * 1.17) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.60);
	float d = d1 + d2;
	vec3 col = palette(d * 0.53 + time * 0.28, vec3(0.44, 0.54, 0.46), vec3(0.32, 0.35, 0.49), vec3(1.36, 0.77, 1.37), vec3(0.02, 0.79, 0.16));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
