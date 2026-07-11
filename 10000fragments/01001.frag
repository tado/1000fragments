uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.74 + t * 1.55 + ph) + sin(p.y * 11.70 - t * 1.55 + ph)
        + sin((p.x + p.y) * 3.87 + t * 1.55 + ph) + sin(length(p) * 3.85 - t * 1.55 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.07, vec3(0.47, 0.42, 0.45), vec3(0.41, 0.32, 0.37), vec3(0.98, 1.17, 1.32), vec3(0.72, 0.81, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
