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
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.50 * jf)) * 0.77;
        xs += sin(length(p - im) * 173.43 - t * 4.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.22 * sin(mf + 3.0) + ph), cos(t * 1.22 * cos(mf + 3.0) + ph));
        ms += 0.035 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.05, lr * 2.19 + time * 0.33); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.24);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.25 + time * 0.03, vec3(0.50, 0.45, 0.49), vec3(0.47, 0.40, 0.34), vec3(1.10, 1.34, 0.89), vec3(0.20, 0.10, 0.10));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
