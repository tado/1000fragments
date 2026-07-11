uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.85 + t * 5.07 + ph) + sin(p.y * 5.82 - t * 5.64 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.13, vec3(0.48, 0.53, 0.40), vec3(0.32, 0.35, 0.49), vec3(1.04, 1.14, 1.28), vec3(0.27, 0.85, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
