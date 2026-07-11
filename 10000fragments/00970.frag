uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.62 + t * 2.82 + ph) + sin(p.y * 8.49 - t * 2.82 + ph)
        + sin((p.x + p.y) * 10.92 + t * 2.82 + ph) + sin(length(p) * 8.01 - t * 2.82 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.29);
	col = mod(col * 2.03, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
