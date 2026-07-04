uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.38 + t * 0.72) - 0.5) * 2.0;
    v = sin((p.y * 3.22 + zx * 1.99 + t * 1.43) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.11 + sr * 22.86 - t * 1.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 2.62 + time * 1.22) * 0.75;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.21 / wf * sin(wf * 2.13 * q2.y + time * 0.95); q2.y += 0.44 / wf * cos(wf * 3.12 * q2.x + time * 1.44); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.40; q2 = rot2(1.35) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.39 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
