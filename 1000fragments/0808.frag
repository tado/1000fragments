uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.01 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.79); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.38 * jf)) * 0.34;
        xs += sin(length(p - im) * 185.08 - t * 13.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p += vec2(-0.50, -0.15) * sin(length(p) * 4.82 - time * 1.22) * 0.31;
	p *= 2.66;
	p = rot2(length(p) * 1.24 + time * 0.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.66);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.25 + time * 0.20, vec3(0.49, 0.59, 0.45), vec3(0.48, 0.36, 0.38), vec3(0.70, 1.15, 1.11), vec3(0.16, 0.86, 0.67));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
