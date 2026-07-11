uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.99 - t * 4.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.16, vec3(0.45, 0.56, 0.48), vec3(0.34, 0.43, 0.33), vec3(1.30, 0.87, 0.77), vec3(0.92, 0.47, 0.17));
	col = fract(col * 2.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
