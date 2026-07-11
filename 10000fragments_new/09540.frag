uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.45 + sin(p.y * 5.39 + t * 0.62) * 4.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.24, vec3(0.45, 0.41, 0.49), vec3(0.40, 0.47, 0.39), vec3(1.33, 0.73, 1.04), vec3(0.26, 0.61, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
