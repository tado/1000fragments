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
    float pa = atan(p.y, p.x) + t * 0.75;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 21.63 - t * 5.61 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.37 * vnoise2(p * 3.00 + t * 0.87);
    v = sin(wr * 17.87 - t * 0.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.81 * p.y + time * 0.81); p.y += 0.22 / wf * cos(wf * 3.85 * p.x + time * 1.17); }
	p += vec2(0.77, -0.30) * sin(length(p) * 5.28 - time * 1.57) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = d1 * d2;
	vec3 col = palette(d * 1.04 + time * 0.05, vec3(0.51, 0.46, 0.52), vec3(0.43, 0.39, 0.42), vec3(1.20, 1.39, 1.39), vec3(0.70, 0.62, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
