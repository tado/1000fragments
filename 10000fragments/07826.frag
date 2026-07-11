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
    v = 0.5 * sin(length(p) * 10.39 - t * 1.44 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.52; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.17 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.45 * p.y + time * 1.75); p.y += 0.37 / wf * cos(wf * 2.50 * p.x + time * 1.49); }
	p = rot2(length(p) * 1.06 + time * 0.49) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.13 + time * 0.18, vec3(0.45, 0.58, 0.57), vec3(0.38, 0.48, 0.50), vec3(1.20, 1.35, 0.90), vec3(0.89, 0.81, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
