uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.46 + t * 4.54 + ph) + sin(p.y * 4.68 - t * 4.54 + ph)
        + sin((p.x + p.y) * 4.86 + t * 4.54 + ph) + sin(length(p) * 4.62 - t * 4.54 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.12, vec3(0.49, 0.44, 0.55), vec3(0.42, 0.38, 0.41), vec3(0.75, 1.40, 0.80), vec3(0.40, 0.18, 0.05));
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
