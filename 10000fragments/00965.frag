uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.29 + t * 1.10 + ph) + sin(p.y * 12.76 - t * 1.10 + ph)
        + sin((p.x + p.y) * 2.58 + t * 1.10 + ph) + sin(length(p) * 17.13 - t * 1.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p = fract(p * 2.06) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.23, vec3(0.47, 0.41, 0.51), vec3(0.48, 0.44, 0.39), vec3(0.84, 0.98, 0.78), vec3(0.76, 0.53, 0.48));
	col = fract(col * 2.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
