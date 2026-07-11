uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.09) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.46 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 37.97 - t * 3.96 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 34.83 - t * 3.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.53; p = rot2(2.49) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.14, vec3(0.59, 0.51, 0.49), vec3(0.49, 0.33, 0.30), vec3(1.12, 1.15, 0.97), vec3(0.24, 0.09, 0.85));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
