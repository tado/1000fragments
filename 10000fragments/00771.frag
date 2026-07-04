uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.64 + t * 0.97) - 0.5) * 2.0;
    v = sin((p.y * 6.80 + zx * 0.63 + t * 1.20) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.71 + t * 1.54 + ph) + sin(p.y * 6.41 - t * 1.54 + ph)
        + sin((p.x + p.y) * 8.19 + t * 1.54 + ph) + sin(length(p) * 4.15 - t * 1.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.38 * sin(time * 3.48);
	p *= 1.53;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.16 + time * 0.17, vec3(0.50, 0.54, 0.58), vec3(0.32, 0.38, 0.32), vec3(0.95, 1.28, 1.20), vec3(0.18, 0.58, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
