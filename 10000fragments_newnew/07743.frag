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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.71 + jf * 4.0), cos(t * 0.42 * jf)) * 0.76;
        xs += sin(length(p - im) * 68.00 - t * 8.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.53;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 1.93 + time * 0.44); }
	p = rot2(time * 0.39) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.21; p = rot2(1.40) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.12, vec3(0.55, 0.59, 0.59), vec3(0.50, 0.43, 0.31), vec3(1.13, 1.15, 1.35), vec3(0.33, 0.03, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
