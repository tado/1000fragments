uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.27 * pow(abs(cos(ra * 2.0 + t * 2.87)), 2.09);
    v = sin((rr - pet) * 13.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.15 + sin(p.y * 2.72 + t * 3.30) * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.64 + time * 0.16, vec3(0.41, 0.47, 0.42), vec3(0.34, 0.34, 0.41), vec3(1.08, 0.72, 0.77), vec3(0.32, 0.03, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
