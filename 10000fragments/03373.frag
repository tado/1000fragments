uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.53) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.19 - t * 1.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.45; p = rot2(1.61) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.73 + time * 0.23, vec3(0.45, 0.48, 0.54), vec3(0.48, 0.38, 0.35), vec3(0.82, 1.33, 1.08), vec3(0.79, 0.85, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
