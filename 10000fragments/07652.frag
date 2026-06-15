uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.19 * cos(sa * 6 + t * 1.95 + ph);
    v = sin((sr - petal) * 8.30);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.67, 0.46) * sin(length(p) * 4.90 - time * 0.88) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.12, vec3(0.53, 0.52, 0.51), vec3(0.49, 0.37, 0.38), vec3(1.23, 1.08, 1.10), vec3(0.75, 0.74, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
