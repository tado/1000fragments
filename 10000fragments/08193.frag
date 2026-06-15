uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.40 + t * 4.90 + ph) + sin(p.y * 5.01 - t * 4.90 + ph)
        + sin((p.x + p.y) * 4.38 + t * 4.90 + ph) + sin(length(p) * 7.50 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 2.88 - time * 0.26); }
	p *= 1.98;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.72 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
