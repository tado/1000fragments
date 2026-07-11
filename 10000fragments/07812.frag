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
    vec2 vp = p * 5.47; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.86 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.58 + vec2(t * 1.20, -t * 1.20) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p = rot2(length(p) * 3.74 + time * 0.49) * p;
	p = rot2(1.55) * p;
	p += vec2(0.40, 0.61) * sin(length(p) * 2.10 - time * 1.40) * 0.19;
	p *= 2.47;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = d1 * d2;
	vec3 col = palette(d * 0.79 + time * 0.28, vec3(0.55, 0.48, 0.53), vec3(0.31, 0.43, 0.39), vec3(1.14, 1.14, 1.05), vec3(0.60, 0.73, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
