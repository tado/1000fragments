uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.89 + t * 1.07 + ph) + sin(p.y * 3.24 - t * 1.07 + ph)
        + sin((p.x + p.y) * 8.32 + t * 1.07 + ph) + sin(length(p) * 12.07 - t * 1.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.17, vec3(0.42, 0.44, 0.58), vec3(0.36, 0.46, 0.47), vec3(1.26, 1.35, 1.33), vec3(0.13, 0.93, 0.37));
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
