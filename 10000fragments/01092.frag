uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.01 + vec2(t * 1.52, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.68 + t * 3.37 + ph) + sin(p.y * 7.10 - t * 3.37 + ph)
        + sin((p.x + p.y) * 3.59 + t * 3.37 + ph) + sin(length(p) * 5.60 - t * 3.37 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 3.32 - time * 0.66); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.83);
	float d = d1 * d2;
	vec3 col = palette(d * 1.53 + time * 0.30, vec3(0.59, 0.50, 0.41), vec3(0.35, 0.47, 0.48), vec3(0.74, 1.38, 1.17), vec3(0.58, 0.89, 0.75));
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
