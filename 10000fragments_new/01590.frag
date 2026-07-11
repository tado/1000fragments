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
    vec2 vp = p * 6.40; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.34 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p = rot2(p.y * -2.77 + time * 0.46) * p;
	p = rot2(length(p) * -3.80 + time * 0.46) * p;
	p = rot2(1.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.19, vec3(0.47, 0.58, 0.45), vec3(0.43, 0.43, 0.41), vec3(1.35, 1.38, 1.06), vec3(0.09, 0.14, 0.07));
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 1.80 + time * 10.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
