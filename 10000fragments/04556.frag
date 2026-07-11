uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 13.40 - t * 2.92 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 38.71 - t * 2.92 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.90 + sin(p.y * 4.50 + t * 3.95) * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.11; p = rot2(0.80) * p; }
	p *= 2.65;
	p = fract(p * 1.51) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.88);
	float d = d1 * d2;
	vec3 col = palette(d * 0.83 + time * 0.01, vec3(0.56, 0.47, 0.59), vec3(0.50, 0.38, 0.49), vec3(1.04, 1.26, 1.28), vec3(0.71, 0.85, 0.21));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
