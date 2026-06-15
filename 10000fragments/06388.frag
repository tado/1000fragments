uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.32 + t * 0.81 + ph) + sin(p.y * 15.19 - t * 4.57 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.43 + t * 2.47 + ph) + sin(p.y * 6.76 - t * 3.67 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.48 + time * 0.24, vec3(0.53, 0.42, 0.55), vec3(0.31, 0.34, 0.31), vec3(0.83, 1.19, 1.21), vec3(0.50, 0.62, 0.59));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
