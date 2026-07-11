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
    v = sin(p.x * 13.61 + sin(p.y * 5.14 + t * 3.21) * 1.11 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.61; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.76 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 2.95 - time * 0.52); }
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = d1 * d2;
	vec3 col = palette(d * 1.36 + time * 0.23, vec3(0.56, 0.45, 0.48), vec3(0.42, 0.30, 0.36), vec3(0.83, 1.09, 1.28), vec3(0.88, 0.44, 0.07));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
