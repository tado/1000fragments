uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.06 + vec2(t * 0.38, -t * 0.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.59 * jf)) * 0.96;
        xs += sin(length(p - im) * 212.48 - t * 12.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.45;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(0.79) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.43 + time * 0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.04, vec3(0.48, 0.60, 0.43), vec3(0.39, 0.47, 0.40), vec3(1.31, 1.07, 0.75), vec3(0.29, 0.09, 0.77));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
