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
    v = 0.5 * sin(length(p) * 19.94 - t * 4.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.90; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.17 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.60, -0.74) * sin(length(q1) * 2.09 - time * 1.79) * 0.11;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.85));
	vec3 col = palette(d * 1.11 + time * 0.21, vec3(0.59, 0.44, 0.52), vec3(0.33, 0.38, 0.34), vec3(1.03, 0.99, 0.81), vec3(0.48, 0.57, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
