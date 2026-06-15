uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.48 - t * 6.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.88) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.86 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.32 + time * 0.28, vec3(0.43, 0.57, 0.49), vec3(0.50, 0.50, 0.40), vec3(0.71, 1.35, 1.19), vec3(0.87, 0.67, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
