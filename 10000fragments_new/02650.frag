uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.59 - t * 8.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.18, vec3(0.55, 0.46, 0.58), vec3(0.49, 0.30, 0.33), vec3(1.33, 1.30, 0.81), vec3(0.32, 0.40, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
