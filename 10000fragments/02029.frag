uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.26 * cos(sa * 8.0 + t * 1.47 + ph);
    v = sin((sr - petal) * 9.10);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.72 + t * 1.61 + ph) * 0.7;
    float wb = sin(p.y * 19.01 - t * 1.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.30; }
	p.x += sin(p.y * 4.01 + time * 1.68) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.21, vec3(0.50, 0.43, 0.46), vec3(0.35, 0.43, 0.43), vec3(1.13, 1.06, 1.33), vec3(0.37, 0.00, 0.98));
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
