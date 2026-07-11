uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.74;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.58)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.16 - t * 4.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.63;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.21 + 0.10 * sin(t * 3.17 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.34 / wf * sin(wf * 2.83 * q2.y + time * 1.01); q2.y += 0.35 / wf * cos(wf * 3.12 * q2.x + time * 0.85); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.17);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.28 + time * 0.37, vec3(0.59, 0.41, 0.54), vec3(0.46, 0.32, 0.38), vec3(1.26, 0.95, 0.90), vec3(0.61, 0.48, 0.28));
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
