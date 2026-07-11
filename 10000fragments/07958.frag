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
    vec2 vp = p * 2.44; vec2 vi = floor(vp), vf = fract(vp); float m1 = 8.0, m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.73 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.28; vec2 jc = vec2(-0.72 + 0.3 * sin(t * 0.74 + ph), -0.67 + 0.3 * cos(t * 0.74 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 5.82 - time * 0.73); }
	{ float fr = length(p); p *= 1.0 + 0.52 * fr * fr; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = d1 * d2;
	vec3 col = palette(d * 0.96 + time * 0.25, vec3(0.56, 0.55, 0.56), vec3(0.35, 0.50, 0.32), vec3(1.30, 0.99, 1.24), vec3(0.13, 0.58, 1.00));
	col = mod(col * 2.14, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
