uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.28 * cos(sa * 8 + t * 1.62 + ph);
    v = sin((sr - petal) * 13.45);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.66 - t * 1.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	p *= 2.28;
	p = fract(p * 1.73) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.48 + time * 0.18, vec3(0.57, 0.52, 0.40), vec3(0.31, 0.36, 0.42), vec3(0.85, 0.90, 0.98), vec3(0.25, 0.49, 0.50));
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
