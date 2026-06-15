uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.93) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 0.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.02 + t * 3.99 + ph) + sin(p.y * 13.18 - t * 3.99 + ph)
        + sin((p.x + p.y) * 6.65 + t * 3.99 + ph) + sin(length(p) * 12.59 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.79;
	{ float fr = length(p); p *= 1.0 + -0.37 * fr * fr; }
	p = fract(p * 1.21) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.62 * p.y + time * 1.13); p.y += 0.25 / wf * cos(wf * 3.33 * p.x + time * 0.63); }
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 3.05 - time * 0.39); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = d1 * d2;
	vec3 col = palette(d * 0.54 + time * 0.06, vec3(0.40, 0.42, 0.53), vec3(0.44, 0.31, 0.44), vec3(1.25, 0.85, 1.36), vec3(0.70, 0.78, 0.32));
	col = clamp((col - 0.5) * 2.16 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
