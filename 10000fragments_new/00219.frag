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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 1.08 + ph), sin(lt * 3.0 + t * 1.37)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.44) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.10 + ph), vnoise2(p * 2.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.10 + 2.45 * wq + vec2(1.7, 9.2) + t * 0.82),
                   vnoise2(p * 2.10 + 2.72 * wq + vec2(8.3, 2.8) - t * 0.36));
    v = vnoise2(p * 2.10 + 3.82 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	p = rot2(time * -1.20) * p;
	p = (floor(p * 7.0) + 0.5) / 7.0;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.78 + time * 0.09, vec3(0.44, 0.58, 0.41), vec3(0.43, 0.36, 0.36), vec3(1.21, 0.77, 1.12), vec3(0.47, 0.45, 0.73));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.07 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
