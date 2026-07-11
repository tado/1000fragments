uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.07 + t * 1.70 + ph) + sin(p.y * 11.81 - t * 1.70 + ph)
        + sin((p.x + p.y) * 7.45 + t * 1.70 + ph) + sin(length(p) * 8.00 - t * 1.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	p += vec2(0.65, 0.96) * sin(length(p) * 5.22 - time * 1.05) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.99 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
