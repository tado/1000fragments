uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.31) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 3.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 8.55 - t * 3.76 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 19.52 - t * 3.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.97);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.41 + time * 0.28, vec3(0.59, 0.41, 0.47), vec3(0.43, 0.48, 0.31), vec3(0.79, 1.33, 0.99), vec3(0.34, 0.96, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
