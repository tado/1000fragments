uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.24 + vec2(t * 0.88, -t * 1.24);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.19);
    float gsh = hash21(vec2(grow, floor(t * 6.81))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 16.71 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.49));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.38, length(q1) * 3.00 - time * 0.33); }
	q1.x += sin(q1.y * 4.80 + time * 1.24) * 0.24;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.62, length(q2) * 4.20 - time * 0.60); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.51);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.39, 0.02), vec3(0.78, 0.82, 0.89), cc);
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
