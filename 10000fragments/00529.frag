uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.93 + t * 0.95) - 0.5) * 2.0;
    v = sin((p.y * 2.13 + zx * 1.84 + t * 1.44) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.53);
    float gsh = hash21(vec2(grow, floor(t * 9.80))) - 0.5;
    float gx = p.x + gsh * 1.17;
    v = sin(gx * 12.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.88));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.22; q1 = rot2(0.76) * q1; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.48 / wf * sin(wf * 2.64 * q2.y + time * 0.94); q2.y += 0.24 / wf * cos(wf * 1.99 * q2.x + time * 1.98); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.37, 0.07), vec3(0.60, 0.92, 0.80), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
