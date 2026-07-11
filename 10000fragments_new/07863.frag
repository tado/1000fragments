uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.29 * pow(abs(cos(ra * 7.0 + t * 0.95)), 1.76);
    v = sin((rr - pet) * 20.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.18, vec3(0.55, 0.51, 0.52), vec3(0.31, 0.31, 0.35), vec3(0.82, 0.77, 1.21), vec3(0.35, 0.67, 0.40));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
