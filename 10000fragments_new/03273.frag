uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.12 * cos(sa * 7.0 + t * 2.41 + ph);
    v = sin((sr - petal) * 7.53);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.25, vec3(0.50, 0.53, 0.40), vec3(0.38, 0.32, 0.34), vec3(1.20, 1.03, 1.14), vec3(0.19, 0.22, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
