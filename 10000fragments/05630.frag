uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.07) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 15.96 - t * 7.94 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 37.29 - t * 7.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.69 + time * 0.28, vec3(0.43, 0.43, 0.56), vec3(0.36, 0.35, 0.45), vec3(1.30, 1.00, 1.18), vec3(0.58, 0.04, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
