uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.76;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.80 - t * 4.02 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.57 * jf)) * 0.72;
        xs += sin(length(p - im) * 74.67 - t * 11.59 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 1.73 + time * -0.42); }
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.17 + time * 0.13, vec3(0.49, 0.41, 0.43), vec3(0.42, 0.32, 0.33), vec3(1.17, 1.34, 1.39), vec3(0.82, 0.61, 0.99));
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
