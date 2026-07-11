uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.17 + t * 5.20 + ph) + sin(p.y * 17.05 - t * 2.14 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.28, vec3(0.52, 0.59, 0.55), vec3(0.33, 0.37, 0.49), vec3(1.23, 0.76, 0.96), vec3(0.66, 0.24, 0.12));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
