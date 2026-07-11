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
    vec2 vp = p * 8.64; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.80 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.29 * jf)) * 0.71;
        xs += sin(length(p - im) * 214.72 - t * 13.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.33) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.62 * p.y + time * 1.03); p.y += 0.44 / wf * cos(wf * 2.94 * p.x + time * 0.65); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = d1 * d2;
	vec3 col = palette(d * 0.65 + time * 0.23, vec3(0.60, 0.55, 0.55), vec3(0.42, 0.48, 0.36), vec3(1.16, 0.75, 1.33), vec3(0.32, 0.80, 0.58));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
