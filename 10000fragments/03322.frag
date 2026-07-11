uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.46 + t * 4.52 + ph) + sin(p.y * 11.40 - t * 1.15 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.80) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.99);
	float d = d1 * d2;
	vec3 col = palette(d * 0.90 + time * 0.13, vec3(0.58, 0.44, 0.46), vec3(0.46, 0.37, 0.45), vec3(0.94, 1.32, 1.33), vec3(0.64, 0.62, 0.18));
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
