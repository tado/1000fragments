uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.78 + vec2(t * 2.03, -t * 2.03) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.29 + t * 1.61 + ph) + sin(p.y * 5.66 - t * 1.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 2.75, length(p) * 5.51 - time * 0.16); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.71 + time * 0.05, vec3(0.57, 0.57, 0.60), vec3(0.45, 0.41, 0.42), vec3(0.76, 0.70, 1.23), vec3(0.75, 0.99, 0.43));
	col = mod(col * 2.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
