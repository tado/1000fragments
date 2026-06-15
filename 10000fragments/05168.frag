uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.14 * cos(sa * 4 + t * 1.35 + ph);
    v = sin((sr - petal) * 10.85);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	p *= 3.30;
	p += vec2(0.05, 0.26) * sin(length(p) * 3.39 - time * 1.48) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.81, 0.81, 0.88) + vec3(0.23, 0.29, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
