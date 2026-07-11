uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.60; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.27 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.58 + t * 3.72 + ph) + sin(p.y * 13.35 - t * 3.72 + ph)
        + sin((p.x + p.y) * 10.79 + t * 3.72 + ph) + sin(length(p) * 5.50 - t * 3.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.21) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.29, length(q2) * 4.08 - time * 0.96); }
	q2 = rot2(length(q2) * 1.59 + time * 0.34) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.92 + time * 0.19);
	col = fract(col * 1.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
