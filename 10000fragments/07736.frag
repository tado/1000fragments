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
    vec2 vp = p * 4.85; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.26 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 35.24 - t * 3.13 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 27.55 - t * 3.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.32 * p.y + time * 1.40); p.y += 0.21 / wf * cos(wf * 3.08 * p.x + time * 1.32); }
	p += vec2(0.97, -0.94) * sin(length(p) * 3.07 - time * 0.76) * 0.30;
	p = rot2(time * 0.71) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = d1 * d2;
	vec3 col = palette(d * 0.74 + time * 0.29, vec3(0.42, 0.56, 0.42), vec3(0.32, 0.42, 0.49), vec3(0.83, 1.18, 1.17), vec3(0.47, 0.55, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
