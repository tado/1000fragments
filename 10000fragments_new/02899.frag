uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.74 + t * 1.22 + ph) + sin(p.y * 17.38 - t * 1.60 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.77 + t * 0.64 + ph) + sin(p.y * 12.02 - t * 0.64 + ph)
        + sin((p.x + p.y) * 5.06 + t * 0.64 + ph) + sin(length(p) * 4.19 - t * 0.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	{ p = vec2(atan(p.y, p.x) * 1.35, length(p) * 2.54 - time * 0.26); }
	p = (floor(p * 10.7) + 0.5) / 10.7;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = d1 * d2;
	vec3 col = palette(d * 1.58 + time * 0.23, vec3(0.40, 0.52, 0.40), vec3(0.32, 0.48, 0.33), vec3(1.25, 1.10, 1.07), vec3(0.13, 0.01, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
