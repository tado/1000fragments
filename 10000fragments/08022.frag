uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.76 + t * 3.99 + ph) + sin(p.y * 12.54 - t * 3.99 + ph)
        + sin((p.x + p.y) * 2.72 + t * 3.99 + ph) + sin(length(p) * 11.73 - t * 3.99 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.78; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.02 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.15, vec3(0.48, 0.46, 0.51), vec3(0.43, 0.44, 0.49), vec3(1.21, 1.15, 1.13), vec3(0.70, 0.48, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
