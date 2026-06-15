uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.19 - t * 1.62 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.69 + t * 2.45 + ph) + sin(p.y * 2.41 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.40 + time * 0.30, vec3(0.56, 0.49, 0.40), vec3(0.35, 0.32, 0.35), vec3(0.79, 0.86, 1.23), vec3(0.06, 0.49, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
