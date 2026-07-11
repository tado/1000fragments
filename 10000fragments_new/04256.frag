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
    vec2 vp = p * 6.35; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.53 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.75, t * 2.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p = rot2(1.44) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.60; p = rot2(2.26) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.55 + time * 0.05, vec3(0.50, 0.41, 0.47), vec3(0.47, 0.39, 0.34), vec3(1.17, 1.39, 0.92), vec3(0.52, 0.10, 0.82));
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 2.13 + time * 14.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
