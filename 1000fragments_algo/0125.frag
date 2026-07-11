uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.71; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.04 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.26; p = rot2(0.45) * p; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.09;
	p.y += sin(p.x * 4.62 + (time * 0.53) * 1.97) * 0.14;
	float d = field(p, (time * 0.53), 0.0);
	vec3 col = palette(d * 0.58 + (time * 0.53) * 0.06, vec3(0.49, 0.44, 0.44), vec3(0.18, 0.19, 0.19), vec3(0.71, 0.45, 0.73), vec3(0.11, 0.07, 0.65));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.967, 1.050) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
