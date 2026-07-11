uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.35 + t * 2.91 + ph) + sin(p.y * 9.91 - t * 2.91 + ph)
        + sin((p.x + p.y) * 5.12 + t * 2.91 + ph) + sin(length(p) * 8.46 - t * 2.91 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.44; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.57 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.32 + 0.34 * sin(t * 1.59)) + vec2(-0.60, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 30; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 += vec2(-0.08, 0.75) * sin(length(q3) * 5.76 - time * 1.63) * 0.38;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 1.56);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.26, vec3(0.43, 0.43, 0.59), vec3(0.38, 0.30, 0.47), vec3(1.22, 0.94, 1.07), vec3(0.11, 0.05, 0.74));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
