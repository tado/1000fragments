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
    vec2 vp = p * 3.47; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.43 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 33.63 - t * 2.20 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 14.77 - t * 5.69 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.31; p = rot2(2.29) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.75 * p.y + time * 2.04); p.y += 0.38 / wf * cos(wf * 2.84 * p.x + time * 1.70); }
	p += vec2(-0.81, 0.72) * sin(length(p) * 2.69 - time * 1.73) * 0.22;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 3.67 - time * 0.21); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = d1 + d2;
	vec3 col = palette(d * 0.87 + time * 0.29, vec3(0.52, 0.59, 0.49), vec3(0.47, 0.30, 0.48), vec3(0.95, 1.04, 1.21), vec3(0.26, 0.44, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
