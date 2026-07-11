uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.57 + t * 3.32 + ph) * 0.7;
    float wb = sin(p.y * 19.97 - t * 3.78 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.42;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	p = (floor(p * 27.6) + 0.5) / 27.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.24, vec3(0.40, 0.40, 0.46), vec3(0.34, 0.39, 0.44), vec3(1.33, 1.19, 1.38), vec3(0.77, 0.53, 0.01));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
