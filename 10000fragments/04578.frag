uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.90) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.20 + t * 3.28 + ph) + sin(p.y * 11.27 - t * 3.28 + ph)
        + sin((p.x + p.y) * 4.52 + t * 3.28 + ph) + sin(length(p) * 15.13 - t * 3.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.79 + time * 0.23, vec3(0.53, 0.60, 0.48), vec3(0.35, 0.40, 0.50), vec3(1.28, 0.94, 1.34), vec3(0.88, 0.60, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
