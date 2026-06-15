uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.44 - t * 8.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.39 + t * 0.60 + ph) + sin(p.y * 4.08 - t * 0.60 + ph)
        + sin((p.x + p.y) * 4.69 + t * 0.60 + ph) + sin(length(p) * 10.68 - t * 0.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.73);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + time * 0.13, vec3(0.47, 0.48, 0.56), vec3(0.48, 0.47, 0.45), vec3(0.96, 0.82, 1.35), vec3(0.94, 0.59, 0.69));
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
