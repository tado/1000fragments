uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.19 + t * 4.96 + ph) + sin(p.y * 14.06 - t * 4.55 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.11; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.98 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.79 + sin(p.y * 1.47 + t * 3.23) * 3.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.61, -0.85) * sin(length(q1) * 4.05 - time * 0.89) * 0.29;
	q1 = fract(q1 * 1.33) - 0.5;
	q2 = rot2(time * -0.35) * q2;
	q2 = fract(q2 * 2.54) - 0.5;
	q3 = rot2(time * 1.48) * q3;
	q3.x += sin(q3.y * 7.93 + time * 2.92) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d3 = fieldC(q3, time, 0.76);
	d2 = max(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.79 + time * 0.54);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
