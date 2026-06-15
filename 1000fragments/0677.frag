uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.18 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.47); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	p *= 3.08;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.89 * p.y + time * 1.50); p.y += 0.25 / wf * cos(wf * 1.74 * p.x + time * 1.45); }
	p += vec2(-0.19, -0.83) * sin(length(p) * 4.29 - time * 0.62) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.29, vec3(0.57, 0.58, 0.56), vec3(0.48, 0.38, 0.46), vec3(0.82, 0.99, 0.95), vec3(0.77, 0.99, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
