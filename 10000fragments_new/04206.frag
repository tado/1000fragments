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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.95 + ph), vnoise2(p * 4.95 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.95 + 2.24 * wq + vec2(1.7, 9.2) + t * 0.84),
                   vnoise2(p * 4.95 + 3.57 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 4.95 + 1.45 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 2.36 * p.y + time * 0.71); p.y += 0.23 / wf * cos(wf * 3.19 * p.x + time * 1.03); }
	p = rot2(p.y * -2.11 + time * 0.51) * p;
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 3.01 - time * 0.58); }
	p += vec2(-0.34, -0.54) * sin(length(p) * 4.63 - time * 1.28) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.62 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
