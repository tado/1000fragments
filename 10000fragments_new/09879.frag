uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.47 + t * 4.07 + ph) + sin(p.y * 9.61 - t * 4.07 + ph)
        + sin((p.x + p.y) * 5.24 + t * 4.07 + ph) + sin(length(p) * 11.79 - t * 4.07 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.57; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.20 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 1.63 + time * 0.59) * q2;
	q2 *= 1.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.14);
	float d = d1 * d2;
	vec3 col = vec3(0.99, 0.97, 0.73) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 2.00 + time * 10.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
