uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.24 + t * 3.94 + ph) + sin(p.y * 14.10 - t * 0.80 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.60 + t * 4.92 + ph) + sin(p.y * 4.35 - t * 4.92 + ph)
        + sin((p.x + p.y) * 4.33 + t * 4.92 + ph) + sin(length(p) * 6.96 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.58 + time * 0.28, vec3(0.42, 0.47, 0.49), vec3(0.44, 0.35, 0.33), vec3(1.04, 0.74, 0.74), vec3(0.59, 0.87, 0.96));
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
