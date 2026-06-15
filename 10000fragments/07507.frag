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
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.36 * jf)) * 0.82;
        xs += sin(length(p - im) * 110.45 - t * 7.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.15 + t * 0.94 + ph) + sin(p.y * 10.48 - t * 0.94 + ph)
        + sin((p.x + p.y) * 9.45 + t * 0.94 + ph) + sin(length(p) * 3.92 - t * 0.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.41) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.67 * p.y + time * 1.67); p.y += 0.22 / wf * cos(wf * 3.61 * p.x + time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.79 + time * 0.04, vec3(0.51, 0.44, 0.44), vec3(0.43, 0.44, 0.41), vec3(0.75, 0.85, 1.01), vec3(0.57, 0.56, 0.91));
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
