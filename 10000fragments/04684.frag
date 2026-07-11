uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.60) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 25.28 - t * 6.63 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 21.39 - t * 6.63 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.72) - 0.5;
	p += vec2(-0.39, 0.93) * sin(length(p) * 5.42 - time * 0.95) * 0.11;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.22; p = rot2(1.14) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = d1 + d2;
	vec3 col = palette(d * 0.51 + time * 0.30, vec3(0.49, 0.55, 0.52), vec3(0.38, 0.48, 0.50), vec3(0.82, 0.92, 0.96), vec3(0.89, 0.53, 0.88));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
