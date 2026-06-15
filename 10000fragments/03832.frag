uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.22 - t * 5.54 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.12, vec3(0.56, 0.49, 0.51), vec3(0.49, 0.32, 0.39), vec3(0.97, 0.75, 1.03), vec3(0.35, 0.24, 0.30));
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
