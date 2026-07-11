uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.21 + t * 2.80 + ph) + sin(p.y * 12.68 - t * 0.90 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.94 + jf * 4.0), cos(t * 0.39 * jf)) * 0.96;
        xs += sin(length(p - im) * 71.33 - t * 7.09 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.21 * p.y + time * 1.29); p.y += 0.32 / wf * cos(wf * 2.64 * p.x + time * 1.52); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = d1 + d2;
	vec3 col = palette(d * 1.31 + time * 0.21, vec3(0.56, 0.50, 0.45), vec3(0.49, 0.48, 0.46), vec3(0.80, 1.01, 1.06), vec3(0.95, 0.91, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
