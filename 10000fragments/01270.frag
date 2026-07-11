uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.23 + t * 3.11 + ph) + sin(p.y * 7.15 - t * 3.11 + ph)
        + sin((p.x + p.y) * 5.20 + t * 3.11 + ph) + sin(length(p) * 7.74 - t * 3.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 4.11 - time * 0.77); }
	p += vec2(0.02, -0.02) * sin(length(p) * 4.61 - time * 1.77) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
