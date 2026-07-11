uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.33 + t * 3.96 + ph) + sin(p.y * 3.87 - t * 3.96 + ph)
        + sin((p.x + p.y) * 2.67 + t * 3.96 + ph) + sin(length(p) * 7.18 - t * 3.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.92 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
