uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 1.81;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.37); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.38, 0.53, rv + 0.04 * sin(t * 2.70 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.00; vec2 jc = vec2(0.31 + 0.3 * sin(t * 0.48 + ph), 0.27 + 0.3 * cos(t * 1.00 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.21 + ph), vnoise2(p * 3.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.21 + 1.24 * wq + vec2(1.7, 9.2) + t * 0.81),
                   vnoise2(p * 3.21 + 3.88 * wq + vec2(8.3, 2.8) - t * 0.51));
    v = vnoise2(p * 3.21 + 1.33 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(time * -1.60) * q2;
	q2 = rot2(length(q2) * -2.26 + time * 1.04) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.70);
	float d3 = fieldC(q3, time, 0.02);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.64 + time * 0.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
