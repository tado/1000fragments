uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.57 + t * 2.47 + ph) + sin(p.y * 9.40 - t * 2.47 + ph)
        + sin((p.x + p.y) * 10.34 + t * 2.47 + ph) + sin(length(p) * 11.65 - t * 2.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.26;
	{ p = vec2(atan(p.y, p.x) * 2.10, length(p) * 4.23 - time * 0.21); }
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	p = rot2(length(p) * 1.08 + time * 1.12) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.73 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
