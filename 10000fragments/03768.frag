uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.95 + sin(p.y * 1.92 + t * 1.73) * 4.32 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.16, vec3(0.46, 0.51, 0.56), vec3(0.44, 0.34, 0.41), vec3(1.27, 0.75, 0.72), vec3(0.29, 0.90, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
