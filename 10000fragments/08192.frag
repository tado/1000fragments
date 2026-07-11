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
    vec2 vp = p * 5.58; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.10 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 24.48 - t * 4.04 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 28.50 - t * 4.04 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	p = rot2(p.y * 3.80 + time * 0.17) * p;
	p = rot2(2.86) * p;
	p *= 2.19;
	{ float fr = length(p); p *= 1.0 + 0.70 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.10, vec3(0.57, 0.55, 0.58), vec3(0.48, 0.41, 0.44), vec3(1.06, 0.94, 0.88), vec3(0.43, 0.10, 0.84));
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
