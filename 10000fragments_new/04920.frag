uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.32 * pow(abs(cos(ra * 7.0 + t * 1.28)), 1.50);
    v = sin((rr - pet) * 15.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.12 * cos(sa * 4.0 + t * 0.94 + ph);
    v = sin((sr - petal) * 14.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.54 + time * 0.11, vec3(0.55, 0.40, 0.53), vec3(0.37, 0.46, 0.39), vec3(0.75, 0.72, 0.72), vec3(0.08, 0.95, 0.74));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
