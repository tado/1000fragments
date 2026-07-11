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
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.59 * jf)) * 0.59;
        xs += sin(length(p - im) * 77.28 - t * 8.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.60; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.06 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.34 + time * 0.87) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.88 * p.y + time * 1.33); p.y += 0.40 / wf * cos(wf * 3.17 * p.x + time * 1.58); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = d1 + d2;
	vec3 col = palette(d * 1.80 + time * 0.19, vec3(0.47, 0.54, 0.51), vec3(0.32, 0.43, 0.40), vec3(0.94, 0.99, 1.01), vec3(0.31, 0.33, 0.73));
	col = mod(col * 2.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
