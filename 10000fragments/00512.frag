uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.94 + t * 0.64 + ph) + sin(p.y * 6.43 - t * 0.64 + ph)
        + sin((p.x + p.y) * 7.26 + t * 0.64 + ph) + sin(length(p) * 15.14 - t * 0.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.91 + time * 0.23);
	col = mod(col * 1.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
