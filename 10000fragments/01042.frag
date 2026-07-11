uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.31 + t * 2.85 + ph) + sin(p.y * 2.62 - t * 2.85 + ph)
        + sin((p.x + p.y) * 4.14 + t * 2.85 + ph) + sin(length(p) * 10.03 - t * 2.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p = fract(p * 1.86) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.26, vec3(0.57, 0.56, 0.59), vec3(0.49, 0.47, 0.33), vec3(0.80, 1.23, 1.33), vec3(0.16, 0.88, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
