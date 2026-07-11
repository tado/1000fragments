uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.31 + t * 3.50 + ph) + sin(p.y * 3.63 - t * 3.19 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.58 + t * 4.21 + ph) + sin(p.y * 11.17 - t * 4.23 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.19, vec3(0.45, 0.59, 0.59), vec3(0.46, 0.47, 0.37), vec3(0.86, 0.75, 0.75), vec3(0.73, 0.01, 0.56));
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
