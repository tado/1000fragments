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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.10 * cos(sa * 9 + t * 1.50 + ph);
    v = sin((sr - petal) * 16.23);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.80; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.81 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.36;
	p = rot2(p.y * 3.13 + time * 0.37) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.86, lr * 2.36 + time * 0.53); }
	p *= 2.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.76 + time * 0.23, vec3(0.40, 0.52, 0.53), vec3(0.37, 0.37, 0.40), vec3(1.29, 0.97, 0.89), vec3(0.89, 0.16, 0.47));
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
