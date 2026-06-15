uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.34) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 0.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.24 + t * 1.67 + ph) + sin(p.y * 5.78 - t * 1.67 + ph)
        + sin((p.x + p.y) * 8.53 + t * 1.67 + ph) + sin(length(p) * 5.92 - t * 1.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.72 + time * 0.13, vec3(0.57, 0.53, 0.46), vec3(0.37, 0.32, 0.30), vec3(1.11, 0.73, 1.20), vec3(0.02, 0.05, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
