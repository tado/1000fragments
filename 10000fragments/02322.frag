uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.49 * jf)) * 0.50;
        xs += sin(length(p - im) * 99.88 - t * 13.63 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.53 * jf)) * 0.97;
        xs += sin(length(p - im) * 136.13 - t * 12.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	p += vec2(0.32, 0.27) * sin(length(p) * 5.58 - time * 1.00) * 0.36;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.14 + time * -0.18); }
	p = fract(p * 2.54) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.36, length(p) * 2.11 - time * 0.25); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.37);
	float d = d1 + d2;
	vec3 col = palette(d * 1.72 + time * 0.03, vec3(0.56, 0.60, 0.50), vec3(0.37, 0.44, 0.39), vec3(1.16, 1.09, 1.25), vec3(0.48, 0.28, 0.28));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
