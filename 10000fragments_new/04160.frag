uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.25 + t * 4.18 + ph) + sin(p.y * 13.90 - t * 4.18 + ph)
        + sin((p.x + p.y) * 9.82 + t * 4.18 + ph) + sin(length(p) * 10.64 - t * 4.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = (floor(p * 9.5) + 0.5) / 9.5;
	p = fract(p * 2.46) - 0.5;
	p.y += sin(p.x * 5.47 + time * 3.07) * 0.36;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.07, vec3(0.54, 0.44, 0.47), vec3(0.40, 0.50, 0.31), vec3(1.00, 1.12, 1.16), vec3(0.09, 0.38, 0.54));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.39 + time * 16.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
