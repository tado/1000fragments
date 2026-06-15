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
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.38 * jf)) * 0.96;
        xs += sin(length(p - im) * 97.86 - t * 11.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.25 * jf)) * 0.92;
        xs += sin(length(p - im) * 206.45 - t * 4.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.60 * p.y + time * 0.90); p.y += 0.44 / wf * cos(wf * 1.55 * p.x + time * 1.30); }
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 2.19 - time * 0.34); }
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.62 + time * 0.29, vec3(0.49, 0.44, 0.54), vec3(0.36, 0.37, 0.34), vec3(0.73, 0.97, 1.38), vec3(0.77, 0.88, 0.89));
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
