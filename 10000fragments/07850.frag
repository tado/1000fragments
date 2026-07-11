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
    vec2 vp = p * 4.23; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.21 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.95) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.82 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.81 * p.y + time * 0.65); p.y += 0.33 / wf * cos(wf * 2.66 * p.x + time * 1.97); }
	p = rot2(length(p) * -3.95 + time * 0.39) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.54; p = rot2(0.60) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 3.71 - time * 0.46); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.87 + time * 0.28, vec3(0.55, 0.60, 0.51), vec3(0.36, 0.40, 0.43), vec3(0.89, 1.07, 1.13), vec3(0.41, 0.21, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
