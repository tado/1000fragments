uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.52; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.65 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.68;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.35 + 0.07 * sin(t * 2.25 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.53 + time * 2.03) * 1.36;
	q1 = (floor(q1 * 15.0) + 0.5) / 15.0;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.00));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.17, 1.21, 1.23) + vec3(0.24, 0.15, 0.10);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
