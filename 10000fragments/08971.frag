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
    vec2 hx = p * 6.49;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 15.74 - t * 1.46 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.47 + ph), vnoise2(p * 4.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.47 + 2.73 * wq + vec2(1.7, 9.2) + t * 0.46),
                   vnoise2(p * 4.47 + 3.01 * wq + vec2(8.3, 2.8) - t * 0.95));
    v = vnoise2(p * 4.47 + 2.66 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p.x += sin(p.y * 2.06 + time * 2.06) * 0.25;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.33));
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.68 + time * 0.17, vec3(0.53, 0.57, 0.42), vec3(0.45, 0.46, 0.46), vec3(1.39, 1.06, 1.27), vec3(0.64, 0.24, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
