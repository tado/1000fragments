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
    vec2 vp = p * 5.15; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.72 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	p += vec2(0.28, 0.50) * sin(length(p) * 4.10 - time * 1.60) * 0.31;
	p = rot2(p.y * 3.29 + time * 0.20) * p;
	p = fract(p * 1.08) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.28, vec3(0.58, 0.47, 0.58), vec3(0.32, 0.48, 0.49), vec3(0.73, 1.30, 1.16), vec3(0.07, 0.16, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
