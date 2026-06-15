uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.42 + t * 0.59 + ph) + sin(p.y * 5.81 - t * 0.59 + ph)
        + sin((p.x + p.y) * 8.97 + t * 0.59 + ph) + sin(length(p) * 12.27 - t * 0.59 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.64 + sr * 11.33 - t * 1.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.61);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.62 + time * 0.10, vec3(0.42, 0.60, 0.55), vec3(0.37, 0.43, 0.30), vec3(1.00, 1.38, 1.28), vec3(0.47, 0.78, 0.20));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
