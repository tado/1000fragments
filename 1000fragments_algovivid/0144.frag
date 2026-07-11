uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.64; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.90 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.28;
	p *= 0.86;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.69; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.76) * 1.86));
	float d = field(p, (time * 0.76), 0.0);
	vec3 col = palette(d * 1.14 + (time * 0.76) * 0.19, vec3(0.35, 0.35, 0.31), vec3(0.29, 0.26, 0.29), vec3(0.48, 0.49, 0.86), vec3(0.86, 0.44, 0.21));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.990, 1.029) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
