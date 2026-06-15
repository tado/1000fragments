uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.89 + jf * 4.0), cos(t * 0.20 * jf)) * 0.61;
        xs += sin(length(p - im) * 60.12 - t * 4.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.25) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 2.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	p = rot2(2.50) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.28, lr * 2.39 + time * -0.17); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.37; p = rot2(0.52) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.29);
	float d = d1 + d2;
	vec3 col = palette(d * 1.63 + time * 0.14, vec3(0.55, 0.48, 0.42), vec3(0.39, 0.32, 0.30), vec3(1.28, 0.77, 1.33), vec3(0.69, 0.29, 0.47));
	col = fract(col * 1.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
