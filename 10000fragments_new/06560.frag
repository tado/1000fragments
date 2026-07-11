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
    vec2 cq = p * 6.92 + vec2(t * 0.35, -t * 1.22) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.85; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.40 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.95, length(p) * 3.86 - time * 0.55); }
	p = rot2(time * -0.86) * p;
	p *= 2.09;
	p.x += sin(p.y * 3.36 + time * 2.77) * 0.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = d1 + d2;
	vec3 col = palette(d * 1.38 + time * 0.04, vec3(0.45, 0.40, 0.42), vec3(0.30, 0.48, 0.41), vec3(0.78, 0.91, 1.22), vec3(0.91, 0.71, 0.27));
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
