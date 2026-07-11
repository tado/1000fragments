uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.33 * jf)) * 0.47;
        xs += sin(length(p - im) * 132.35 - t * 12.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.43) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 3.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.69 * p.y + time * 1.98); p.y += 0.48 / wf * cos(wf * 2.10 * p.x + time * 1.08); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.90;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.13 + time * -0.93); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.60 + time * 0.01, vec3(0.48, 0.55, 0.56), vec3(0.49, 0.47, 0.35), vec3(1.14, 1.38, 0.95), vec3(0.20, 0.96, 0.22));
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
