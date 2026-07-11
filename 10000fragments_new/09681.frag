uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.11 + t * 1.64 + ph) + sin(p.y * 2.73 - t * 1.64 + ph)
        + sin((p.x + p.y) * 3.71 + t * 1.64 + ph) + sin(length(p) * 14.15 - t * 1.64 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.60; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.53 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.61 + time * 0.42) * q1;
	q2.y += sin(q2.x * 5.10 + time * 3.60) * 0.11;
	q2 = fract(q2 * 2.51) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.73);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.14 + time * 0.87);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
