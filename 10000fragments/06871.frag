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
    vec2 vp = p * 7.51; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.45 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.64) - 0.5;
	p = rot2(p.y * 2.61 + time * 0.51) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.52 * p.y + time * 1.34); p.y += 0.39 / wf * cos(wf * 3.24 * p.x + time * 1.69); }
	p = rot2(length(p) * -1.77 + time * 0.93) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.18, vec3(0.56, 0.41, 0.52), vec3(0.37, 0.40, 0.47), vec3(0.73, 1.24, 0.72), vec3(0.36, 0.58, 0.40));
	col = mod(col * 1.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
