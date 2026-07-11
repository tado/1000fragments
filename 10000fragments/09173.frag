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
        vec2 im = vec2(sin(t * 0.96 + jf * 4.0), cos(t * 0.57 * jf)) * 0.58;
        xs += sin(length(p - im) * 192.60 - t * 7.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.17 + t * 2.56 + ph) + sin(p.y * 4.94 - t * 2.56 + ph)
        + sin((p.x + p.y) * 9.93 + t * 2.56 + ph) + sin(length(p) * 6.27 - t * 2.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.10; p = rot2(0.74) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.05 * p.y + time * 1.47); p.y += 0.44 / wf * cos(wf * 3.47 * p.x + time * 1.70); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -3.67 + time * 0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.59);
	float d = d1 + d2;
	vec3 col = palette(d * 0.95 + time * 0.02, vec3(0.46, 0.48, 0.55), vec3(0.36, 0.33, 0.40), vec3(0.89, 1.34, 1.02), vec3(0.34, 0.90, 0.32));
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
