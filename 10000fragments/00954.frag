uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.23 + t * 0.92 + ph) + sin(p.y * 11.19 - t * 0.92 + ph)
        + sin((p.x + p.y) * 4.11 + t * 0.92 + ph) + sin(length(p) * 8.40 - t * 0.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.89 * p.y + time * 1.47); p.y += 0.47 / wf * cos(wf * 2.54 * p.x + time * 1.55); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.19, vec3(0.60, 0.52, 0.59), vec3(0.42, 0.37, 0.40), vec3(1.22, 0.84, 0.83), vec3(0.54, 0.16, 0.69));
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
