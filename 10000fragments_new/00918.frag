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
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.11 + ph), sin(lt * 4.0 + t * 0.90)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.70) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.70 + ph), vnoise2(p * 2.70 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.70 + 2.66 * wq + vec2(1.7, 9.2) + t * 0.94),
                   vnoise2(p * 2.70 + 3.74 * wq + vec2(8.3, 2.8) - t * 0.38));
    v = vnoise2(p * 2.70 + 1.46 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	p += vec2(-0.22, 0.49) * sin(length(p) * 4.69 - time * 1.92) * 0.20;
	p *= 2.95;
	p = (floor(p * 23.5) + 0.5) / 23.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.08 + time * 0.13, vec3(0.60, 0.59, 0.48), vec3(0.38, 0.47, 0.48), vec3(1.32, 1.37, 0.83), vec3(0.01, 0.10, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
