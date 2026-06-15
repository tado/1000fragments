uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.33 * jf)) * 0.83;
        xs += sin(length(p - im) * 70.68 - t * 6.74 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.36 + t * 4.66 + ph) + sin(p.y * 11.24 - t * 4.66 + ph)
        + sin((p.x + p.y) * 7.01 + t * 4.66 + ph) + sin(length(p) * 13.40 - t * 4.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.20 * p.y + time * 1.66); p.y += 0.45 / wf * cos(wf * 3.27 * p.x + time * 0.94); }
	p = rot2(p.y * 2.25 + time * 0.48) * p;
	p *= 2.62;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.70 + time * 0.13, vec3(0.55, 0.60, 0.47), vec3(0.48, 0.31, 0.38), vec3(1.21, 0.94, 1.07), vec3(0.05, 0.01, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
