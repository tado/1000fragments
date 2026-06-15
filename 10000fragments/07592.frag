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
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.31 * jf)) * 0.82;
        xs += sin(length(p - im) * 83.55 - t * 4.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 1.55 + time * 0.12); }
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.16, vec3(0.53, 0.54, 0.44), vec3(0.39, 0.35, 0.46), vec3(0.73, 0.79, 1.25), vec3(0.35, 0.29, 0.43));
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
