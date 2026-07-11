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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.30 * jf)) * 0.32;
        xs += sin(length(p - im) * 73.87 - t * 8.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.70 + t * 5.03 + ph) + sin(p.y * 16.70 - t * 4.06 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.26 * vnoise2(p * 5.60 + t * 0.44);
    v = sin(wr * 16.62 - t * 3.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.26) - 0.5;
	q1 = rot2(length(q1) * -3.68 + (time * 0.51) * 0.50) * q1;
	q2 = (floor(q2 * 17.9) + 0.5) / 17.9;
	q2.y += sin(q2.x * 5.84 + (time * 0.51) * 2.46) * 0.19;
	q3 = rot2(length(q3) * -3.16 + (time * 0.51) * 0.98) * q3;
	float d1 = fieldA(q1, (time * 0.51), 0.0);
	float d2 = fieldB(q2, (time * 0.51), 1.98);
	float d3 = fieldC(q3, (time * 0.51), 1.79);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette((d) * 0.46 + (time * 0.51) * 0.23, vec3(0.26, 0.32, 0.25), vec3(0.16, 0.13, 0.20), vec3(0.54, 0.66, 0.41), vec3(0.30, 0.63, 0.34));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.972, 1.026) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
