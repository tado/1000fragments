uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.66 + t * 0.66 + ph) + sin(p.y * 2.29 - t * 0.66 + ph)
        + sin((p.x + p.y) * 8.10 + t * 0.66 + ph) + sin(length(p) * 7.61 - t * 0.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	p *= 3.11;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.08);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
