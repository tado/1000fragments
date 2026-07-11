uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.96 + jf * 4.0), cos(t * 0.54 * jf)) * 0.75;
        xs += sin(length(p - im) * 172.58 - t * 8.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.64 + t * 1.27 + ph) * 0.7;
    float wb = sin(p.y * 8.18 - t * 1.11 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.68;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.47 / wf * sin(wf * 2.02 * q1.y + time * 1.90); q1.y += 0.36 / wf * cos(wf * 3.32 * q1.x + time * 1.38); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.49 + time * 0.20, vec3(0.56, 0.44, 0.44), vec3(0.35, 0.47, 0.43), vec3(1.23, 1.15, 1.26), vec3(0.83, 0.62, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
