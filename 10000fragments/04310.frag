uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.90) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 1.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 12.88 - t * 1.16 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 13.11 - t * 1.16 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	{ float fr = length(p); p *= 1.0 + 0.22 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.04 + time * 0.08, vec3(0.60, 0.52, 0.44), vec3(0.33, 0.49, 0.50), vec3(0.77, 0.83, 0.98), vec3(0.18, 0.73, 0.32));
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
