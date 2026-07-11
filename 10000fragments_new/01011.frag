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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.29 * jf)) * 0.49;
        xs += sin(length(p - im) * 202.10 - t * 11.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.24, -0.51) * sin(length(p) * 4.13 - time * 1.23) * 0.20;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.12; p = rot2(1.73) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 1.68 + time * -0.46); }
	p = rot2(time * -1.19) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.01, vec3(0.52, 0.48, 0.51), vec3(0.36, 0.33, 0.32), vec3(1.05, 0.92, 0.86), vec3(0.86, 0.86, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
