uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.51 + t * 2.52 + ph) + sin(p.y * 4.31 - t * 4.68 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.90; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.69 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.42 / wf * sin(wf * 2.92 * q1.y + time * 0.63); q1.y += 0.47 / wf * cos(wf * 3.99 * q1.x + time * 1.35); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.21);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.08));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.16, 0.43), vec3(0.67, 0.70, 0.52), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
