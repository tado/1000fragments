uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.11) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.13 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.45 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.80 + time * 0.20, vec3(0.47, 0.50, 0.58), vec3(0.47, 0.31, 0.33), vec3(1.36, 0.92, 0.84), vec3(0.76, 0.01, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
