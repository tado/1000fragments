uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.20 * cos(sa * 9.0 + t * 1.42 + ph);
    v = sin((sr - petal) * 16.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p += vec2(0.85, -0.53) * sin(length(p) * 4.11 - time * 1.97) * 0.19;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.75;
	{ p = vec2(atan(p.y, p.x) * 1.45, length(p) * 3.35 - time * 0.86); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.23, vec3(0.45, 0.45, 0.43), vec3(0.35, 0.42, 0.33), vec3(1.12, 0.86, 0.82), vec3(0.67, 0.27, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
