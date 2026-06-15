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
        vec2 im = vec2(sin(t * 0.73 + jf * 4.0), cos(t * 0.51 * jf)) * 0.49;
        xs += sin(length(p - im) * 147.26 - t * 12.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.11 + t * 1.46 + ph) + sin(p.y * 12.15 - t * 1.46 + ph)
        + sin((p.x + p.y) * 11.34 + t * 1.46 + ph) + sin(length(p) * 16.60 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.44) - 0.5;
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.49, lr * 1.11 + time * -0.37); }
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.23 + time * 0.11, vec3(0.59, 0.54, 0.56), vec3(0.44, 0.43, 0.38), vec3(1.21, 1.00, 1.18), vec3(0.65, 0.80, 0.62));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
