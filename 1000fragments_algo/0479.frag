uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.48; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.16 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.64 * sin(mf + 3.0) + ph), cos(t * 1.12 * cos(mf + 3.0) + ph));
        ms += 0.080 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.26, length(q1) * 2.01 - (time * 0.64) * 0.72); }
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.64) * 1.83));
	q2 = sin(q2 * 1.49 + (time * 0.64) * 1.04) * 0.71;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.90;
	float d1 = fieldA(q1, (time * 0.64), 0.0);
	float d2 = fieldB(q2, (time * 0.64), 0.68);
	float d = max(d1, d2);
	vec3 col = palette((d) * 1.10 + (time * 0.64) * 0.14, vec3(0.27, 0.25, 0.31), vec3(0.11, 0.15, 0.15), vec3(0.57, 0.48, 0.89), vec3(0.29, 0.72, 0.64));
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 2.73 + (time * 0.64) * 16.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.017, 0.959) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
