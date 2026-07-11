uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.48) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.32 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.35 * sin(mf + 3.0) + ph), cos(t * 0.41 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 6.78 + time * 1.17) * 0.11;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 2.56 * q2.y + time * 1.59); q2.y += 0.31 / wf * cos(wf * 3.98 * q2.x + time * 0.73); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.19, vec3(0.51, 0.41, 0.58), vec3(0.41, 0.31, 0.44), vec3(1.06, 0.84, 1.33), vec3(0.75, 0.97, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
