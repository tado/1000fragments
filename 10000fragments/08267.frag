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
    v = sin(p.x * 24.89 + sin(p.y * 4.66 + t * 2.84) * 1.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.58; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.29 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.15) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.51 * p.y + time * 0.77); p.y += 0.44 / wf * cos(wf * 2.22 * p.x + time * 1.01); }
	p *= 2.82;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.98);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.13 + time * 0.21, vec3(0.43, 0.60, 0.47), vec3(0.45, 0.35, 0.43), vec3(0.71, 1.33, 0.92), vec3(0.05, 0.28, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
