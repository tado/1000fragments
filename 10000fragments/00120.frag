uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.77 + t * 2.00 + ph) + sin(p.y * 8.16 - t * 4.79 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.26 - t * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.18);
	float d = d1 * d2;
	vec3 col = palette(d * 1.67 + time * 0.07, vec3(0.45, 0.45, 0.48), vec3(0.40, 0.31, 0.48), vec3(1.05, 1.30, 1.37), vec3(0.69, 0.26, 0.86));
	col = mod(col * 2.05, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
