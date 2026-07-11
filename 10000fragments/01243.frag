uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.80 + t * 0.80 + ph) + sin(p.y * 12.35 - t * 0.80 + ph)
        + sin((p.x + p.y) * 6.08 + t * 0.80 + ph) + sin(length(p) * 12.03 - t * 0.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
