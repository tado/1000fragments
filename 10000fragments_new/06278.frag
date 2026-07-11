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
    float ma = sin(length(p - vec2(0.33, 0.0)) * 29.51 - t * 6.10 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 28.03 - t * 3.60 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.71; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.26 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 18.8) + 0.5) / 18.8;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(2.28) * p; }
	p += vec2(0.13, -0.26) * sin(length(p) * 4.80 - time * 2.36) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = d1 * d2;
	vec3 col = palette(d * 1.39 + time * 0.03, vec3(0.52, 0.58, 0.56), vec3(0.41, 0.34, 0.43), vec3(1.19, 0.93, 1.23), vec3(0.24, 0.62, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
