uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.97; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.02 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.95 * p.y + time * 0.85); p.y += 0.36 / wf * cos(wf * 3.08 * p.x + time * 0.88); }
	p = fract(p * 2.80) - 0.5;
	p += vec2(0.62, 0.50) * sin(length(p) * 5.41 - time * 1.97) * 0.21;
	p *= 3.27;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.44));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
