uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.59 + t * 3.98 + ph) + sin(p.y * 10.08 - t * 3.98 + ph)
        + sin((p.x + p.y) * 8.13 + t * 3.98 + ph) + sin(length(p) * 9.05 - t * 3.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	p = abs(p) - 0.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.60 + time * 0.04);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
