uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.28 * jf)) * 0.46;
        xs += sin(length(p - im) * 168.44 - t * 12.33 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.40;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 13.99 - t * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.83 * p.y + time * 1.20); p.y += 0.21 / wf * cos(wf * 3.13 * p.x + time * 1.05); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.14, vec3(0.47, 0.53, 0.52), vec3(0.38, 0.39, 0.42), vec3(1.02, 1.40, 1.22), vec3(0.92, 0.67, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
