uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.41 - t * 2.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.64) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.29) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.45; p = rot2(1.35) * p; }
	p *= 1.60;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = d1 + d2;
	vec3 col = palette(d * 1.59 + time * 0.04, vec3(0.45, 0.56, 0.44), vec3(0.37, 0.33, 0.42), vec3(0.91, 1.32, 1.39), vec3(0.92, 0.48, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
