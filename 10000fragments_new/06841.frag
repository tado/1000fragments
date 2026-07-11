uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.85 - t * 5.39 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.81) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 3.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	p = rot2(length(p) * 2.61 + time * 0.45) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = d1 + d2;
	vec3 col = palette(d * 0.74 + time * 0.06, vec3(0.55, 0.46, 0.47), vec3(0.48, 0.43, 0.37), vec3(1.33, 0.71, 1.33), vec3(0.96, 0.55, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
