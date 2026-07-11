uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.80 + ph), sin(lt * 5.0 + t * 0.85)) * 0.67;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.39) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.57 * jf)) * 0.68;
        xs += sin(length(p - im) * 61.84 - t * 10.34 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.07, -0.89) * sin(length(q1) * 3.64 - time * 1.27) * 0.16;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.52; q1 = rot2(0.52) * q1; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 3.85 * q2.y + time * 0.79); q2.y += 0.26 / wf * cos(wf * 1.69 * q2.x + time * 1.69); }
	q2 = (floor(q2 * 19.5) + 0.5) / 19.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.71 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
