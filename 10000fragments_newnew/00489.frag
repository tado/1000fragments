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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.95 + ph), vnoise2(p * 1.95 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.95 + 3.31 * wq + vec2(1.7, 9.2) + t * 0.90),
                   vnoise2(p * 1.95 + 1.01 * wq + vec2(8.3, 2.8) - t * 0.65));
    v = vnoise2(p * 1.95 + 2.21 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 39.57 - t * 6.23 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 9.60 - t * 1.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	p = sin(p * 2.92 + time * 0.98) * 0.82;
	p = abs(p);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 1.92 * p.y + time * 1.89); p.y += 0.37 / wf * cos(wf * 3.68 * p.x + time * 2.09); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.28, vec3(0.44, 0.59, 0.48), vec3(0.44, 0.32, 0.38), vec3(1.15, 0.77, 1.30), vec3(0.62, 0.71, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
