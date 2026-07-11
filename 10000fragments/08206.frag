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
    vec2 vp = p * 7.41; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.21 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	p = rot2(3.05) * p;
	{ p = vec2(atan(p.y, p.x) * 1.89, length(p) * 4.63 - time * 0.17); }
	p += vec2(-0.10, 0.67) * sin(length(p) * 5.43 - time * 1.03) * 0.14;
	p *= 3.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.19, vec3(0.50, 0.50, 0.55), vec3(0.43, 0.43, 0.45), vec3(0.75, 0.73, 0.72), vec3(0.21, 0.04, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
