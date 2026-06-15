uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.25 + t * 1.70 + ph) + sin(p.y * 8.07 - t * 1.70 + ph)
        + sin((p.x + p.y) * 8.11 + t * 1.70 + ph) + sin(length(p) * 17.74 - t * 1.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	p = abs(p) - 0.65;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p *= 2.47;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.33 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
