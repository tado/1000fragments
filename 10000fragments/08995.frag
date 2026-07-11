uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.95 + t * 3.36 + ph) + sin(p.y * 5.35 - t * 2.30 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.44 + jf * 4.0), cos(t * 0.30 * jf)) * 0.79;
        xs += sin(length(p - im) * 71.57 - t * 4.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.82 * p.y + time * 0.93); p.y += 0.33 / wf * cos(wf * 3.24 * p.x + time * 1.13); }
	p = abs(p) - 0.63;
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 3.59 - time * 0.80); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.20 + time * 0.21, vec3(0.53, 0.60, 0.47), vec3(0.44, 0.37, 0.41), vec3(1.19, 0.89, 0.98), vec3(0.26, 0.64, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
