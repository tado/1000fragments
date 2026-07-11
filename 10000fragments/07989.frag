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
    float petal = 0.69 + 0.12 * cos(sa * 9 + t * 2.67 + ph);
    v = sin((sr - petal) * 9.93);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.93; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.19 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(0.43) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 4.55 - time * 0.58); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.01 + time * 0.28, vec3(0.42, 0.50, 0.48), vec3(0.40, 0.48, 0.48), vec3(0.77, 1.02, 1.12), vec3(0.15, 0.63, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
