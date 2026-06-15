uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.57 + t * 1.51 + ph) + sin(p.y * 9.89 - t * 1.51 + ph)
        + sin((p.x + p.y) * 7.30 + t * 1.51 + ph) + sin(length(p) * 10.53 - t * 1.51 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.88; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.48 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p = abs(p) - 0.44;
	p = fract(p * 2.66) - 0.5;
	p += vec2(0.89, -0.90) * sin(length(p) * 3.60 - time * 1.95) * 0.27;
	p = rot2(2.24) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.75 + time * 0.17, vec3(0.46, 0.41, 0.59), vec3(0.34, 0.39, 0.41), vec3(1.33, 1.17, 0.88), vec3(0.93, 0.41, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
