uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.98; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.99 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.73 + ph), vnoise2(p * 1.73 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.73 + 3.98 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 1.73 + 2.69 * wq + vec2(8.3, 2.8) - t * 0.48));
    v = vnoise2(p * 1.73 + 1.07 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	p = rot2(p.y * -3.10 + time * 0.50) * p;
	p = (floor(p * 6.9) + 0.5) / 6.9;
	p = fract(p * 1.04) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.05);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.34 + time * 0.08, vec3(0.42, 0.48, 0.54), vec3(0.46, 0.49, 0.40), vec3(1.04, 1.17, 1.11), vec3(0.74, 0.16, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
