uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.41; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.75 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.98 * p.y + time * 1.69); p.y += 0.48 / wf * cos(wf * 3.89 * p.x + time * 0.92); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.84));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
