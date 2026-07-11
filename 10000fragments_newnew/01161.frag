uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.12 * cos(sa * 9.0 + t * 2.85 + ph);
    v = sin((sr - petal) * 7.40);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.07, vec3(0.48, 0.48, 0.40), vec3(0.42, 0.39, 0.46), vec3(1.36, 1.39, 0.87), vec3(0.55, 0.51, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
