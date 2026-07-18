uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.98;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.33); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.50, rv + 0.03 * sin(t * 0.59 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.90 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.48); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.44;
	p *= 0.96;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.64) * 2.24));
	float d1 = fieldA(q1, (time * 0.64), 0.0);
	float d2 = fieldB(q2, (time * 0.64), 1.64);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 1.04 + (time * 0.64) * 0.18, vec3(0.73, 0.63, 0.64), vec3(0.25, 0.25, 0.21), vec3(1.00, 0.99, 0.99), vec3(0.92, 0.08, 0.12));
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.025, 0.987, 0.949);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
