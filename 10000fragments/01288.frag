uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.97 + t * 4.08 + ph) + sin(p.y * 5.26 - t * 4.08 + ph)
        + sin((p.x + p.y) * 4.08 + t * 4.08 + ph) + sin(length(p) * 5.89 - t * 4.08 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.28, vec3(0.41, 0.47, 0.54), vec3(0.35, 0.36, 0.32), vec3(0.87, 1.10, 1.08), vec3(0.57, 0.17, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
