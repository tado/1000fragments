uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.22 * pow(abs(cos(ra * 5.0 + t * 1.52)), 1.54);
    v = sin((rr - pet) * 16.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 26.7) + 0.5) / 26.7;
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.22, vec3(0.46, 0.48, 0.57), vec3(0.41, 0.37, 0.39), vec3(1.37, 0.98, 1.09), vec3(0.40, 0.11, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
