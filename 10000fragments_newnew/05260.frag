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
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 2.13;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.73); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.44, 0.59, rv + 0.05 * sin(t * 1.08 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.21 + ph), vnoise2(p * 4.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.21 + 2.99 * wq + vec2(1.7, 9.2) + t * 0.52),
                   vnoise2(p * 4.21 + 1.73 * wq + vec2(8.3, 2.8) - t * 0.87));
    v = vnoise2(p * 4.21 + 2.77 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.92; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.21);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.27 + time * 0.05, vec3(0.47, 0.48, 0.47), vec3(0.43, 0.42, 0.43), vec3(1.34, 1.03, 1.09), vec3(0.76, 0.17, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
