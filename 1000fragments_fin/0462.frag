uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.95; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.13 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.12 - t * 1.84;
    v = sin(floor(lv * 4.7) / 4.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.58) * 0.58), cos((time * 0.58) * 1.01)) * 0.18;
	p.y = abs(p.y) - 0.36;
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.16 + (time * 0.58) * 0.50) * q1;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.30 / wf * sin(wf * 2.25 * q2.y + (time * 0.58) * 0.70); q2.y += 0.38 / wf * cos(wf * 1.62 * q2.x + (time * 0.58) * 1.90); }
	float d1 = fieldA(q1, (time * 0.58), 0.0);
	float d2 = fieldB(q2, (time * 0.58), 1.10);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.062, 0.045, 0.084), vec3(0.491, 0.881, 0.922), cc);
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.029, 0.991, 0.948);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
