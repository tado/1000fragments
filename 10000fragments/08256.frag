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
    vec2 vp = p * 6.67; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.60 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.46) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.77 * p.y + time * 1.37); p.y += 0.23 / wf * cos(wf * 1.61 * p.x + time * 1.47); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.60; p = rot2(0.66) * p; }
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.12, vec3(0.50, 0.56, 0.49), vec3(0.42, 0.43, 0.38), vec3(1.16, 1.11, 0.78), vec3(0.14, 0.06, 0.06));
	col = mod(col * 1.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
