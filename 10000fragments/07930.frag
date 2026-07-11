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
    vec2 vp = p * 2.78; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.65 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.10 + sin(p.y * 3.06 + t * 2.39) * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	p = rot2(p.y * 3.75 + time * 0.18) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.74 * p.y + time * 1.45); p.y += 0.43 / wf * cos(wf * 3.25 * p.x + time * 1.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.87 + time * 0.27, vec3(0.46, 0.52, 0.42), vec3(0.32, 0.45, 0.46), vec3(0.82, 1.15, 0.74), vec3(0.01, 0.12, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
