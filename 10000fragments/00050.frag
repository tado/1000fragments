uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.42 - t * 5.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.29 + t * 2.25 + ph) + sin(p.y * 10.38 - t * 4.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.59 + time * 0.28, vec3(0.51, 0.44, 0.52), vec3(0.30, 0.43, 0.46), vec3(0.94, 0.82, 1.03), vec3(0.02, 0.65, 0.42));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
