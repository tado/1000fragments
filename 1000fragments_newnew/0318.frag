uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.47;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.66 - t * 5.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.63 + vec2(t * 1.39, -t * 0.74);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.01) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.40 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, (time * 0.53), 0.0);
	float d2 = fieldB(q2, (time * 0.53), 0.16);
	float d3 = fieldC(q3, (time * 0.53), 1.58);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = palette((d) * 0.64 + (time * 0.53) * 0.03, vec3(0.36, 0.39, 0.45), vec3(0.08, 0.15, 0.16), vec3(0.44, 0.57, 0.85), vec3(0.39, 0.63, 0.08));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.015, 0.960) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
