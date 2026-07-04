uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.15 + t * 3.71 + ph) * 0.7;
    float wb = sin(p.y * 10.98 - t * 0.50 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.67;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.41 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.07));
	q1 = rot2(length(q1) * -1.44 + time * 0.48) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.78, lr * 2.16 + time * -0.90); }
	q2.x += sin(q2.y * 5.56 + time * 1.03) * 0.39;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.15);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.23, 0.65, 1.40) + vec3(0.05, 0.21, 0.23);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
