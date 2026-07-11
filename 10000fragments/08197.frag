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
    vec2 vp = p * 4.41; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.52 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.58 * jf)) * 0.36;
        xs += sin(length(p - im) * 102.03 - t * 8.97 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	p += vec2(0.46, -0.25) * sin(length(p) * 4.82 - time * 1.14) * 0.24;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.67 * p.y + time * 0.91); p.y += 0.30 / wf * cos(wf * 2.80 * p.x + time * 0.78); }
	p = rot2(time * 0.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.00 + time * 0.07, vec3(0.55, 0.48, 0.48), vec3(0.31, 0.48, 0.43), vec3(1.00, 0.75, 1.15), vec3(0.61, 0.38, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
