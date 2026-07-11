uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.41) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 9.43 - t * 6.72 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 20.07 - t * 1.36 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.25, vec3(0.45, 0.59, 0.46), vec3(0.45, 0.38, 0.38), vec3(1.16, 1.00, 1.09), vec3(0.15, 0.55, 0.58));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
