uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.39 + t * 3.91 + ph) + sin(p.y * 3.13 - t * 3.91 + ph)
        + sin((p.x + p.y) * 3.77 + t * 3.91 + ph) + sin(length(p) * 4.20 - t * 3.91 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p += vec2(0.22, 0.63) * sin(length(p) * 2.23 - time * 1.78) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.13 + time * 0.13);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
