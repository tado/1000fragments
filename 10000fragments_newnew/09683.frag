uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.33 + t * 3.14 + ph) + sin(p.y * 8.41 - t * 3.14 + ph)
        + sin((p.x + p.y) * 5.82 + t * 3.14 + ph) + sin(length(p) * 15.99 - t * 3.14 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.99;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.87 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.85);
    float gsh = hash21(vec2(grow, floor(t * 4.37))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 13.67 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.02));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 1.19;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.36; q2 = rot2(0.45) * q2; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.25 / wf * sin(wf * 2.38 * q3.y + time * 1.07); q3.y += 0.38 / wf * cos(wf * 2.84 * q3.x + time * 1.52); }
	q3 = sin(q3 * 2.53 + time * 0.53) * 1.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.27);
	float d3 = fieldC(q3, time, 1.47);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = hue(d * 0.91 + time * 0.17);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
