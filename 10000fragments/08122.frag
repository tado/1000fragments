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
    vec2 cq = p * 15.99 + vec2(t * 0.53, -t * 0.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.45; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.29 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(2.48) * p; }
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.17 * p.y + time * 1.58); p.y += 0.38 / wf * cos(wf * 2.41 * p.x + time * 1.76); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.17, vec3(0.55, 0.56, 0.49), vec3(0.37, 0.40, 0.40), vec3(0.94, 1.08, 0.71), vec3(0.81, 0.87, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
