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
    float bx = p.x + (vnoise2(vec2(p.y * 1.78, t * 1.84)) - 0.5) * 0.72;
    v = exp(-abs(bx) * 11.77) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.75; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.82 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.76;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.32; p = rot2(2.26) * p; }
	p = rot2(p.y * -2.44 + time * 1.16) * p;
	p = (floor(p * 6.5) + 0.5) / 6.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.75 + time * 0.10, vec3(0.47, 0.42, 0.54), vec3(0.32, 0.34, 0.44), vec3(1.02, 0.79, 1.30), vec3(0.74, 0.51, 0.27));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
