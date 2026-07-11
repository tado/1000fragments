uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.24 * pow(abs(cos(ra * 7.0 + t * 0.57)), 1.24);
    v = sin((rr - pet) * 18.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.28, vec3(0.57, 0.48, 0.47), vec3(0.38, 0.33, 0.49), vec3(0.72, 1.36, 1.13), vec3(0.12, 0.26, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
