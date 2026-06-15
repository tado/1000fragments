uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.11 * cos(sa * 3 + t * 1.71 + ph);
    v = sin((sr - petal) * 12.32);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.26 + t * 0.67 + ph) + sin(p.y * 4.85 - t * 3.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	p += vec2(-0.81, 0.67) * sin(length(p) * 5.66 - time * 0.76) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.59 + time * 0.07, vec3(0.58, 0.49, 0.56), vec3(0.48, 0.35, 0.36), vec3(1.30, 1.37, 0.72), vec3(0.02, 0.75, 0.93));
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
