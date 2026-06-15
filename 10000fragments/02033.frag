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
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.29 * jf)) * 0.57;
        xs += sin(length(p - im) * 99.16 - t * 10.23 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(1.47) * p; }
	p += vec2(-0.95, -0.58) * sin(length(p) * 4.52 - time * 1.23) * 0.22;
	p = rot2(p.y * 3.89 + time * 0.42) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.87, lr * 2.03 + time * 0.59); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.17, vec3(0.52, 0.45, 0.47), vec3(0.47, 0.46, 0.40), vec3(0.95, 0.76, 0.82), vec3(0.15, 0.18, 0.42));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
