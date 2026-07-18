uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.39; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.73 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.29 + vec2(t * 0.74, -t * 1.16);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.57) * 1.06), cos((time * 0.57) * 0.61)) * 0.17;
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.64 * fr * fr; }
	float d1 = fieldA(q1, (time * 0.57), 0.0);
	float d2 = fieldB(q2, (time * 0.57), 1.05);
	float d = max(d1, d2);
	vec3 col = vec3(0.985, 0.852, 0.441) * (0.11 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.995, 1.006, 1.004);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
