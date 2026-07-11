uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.19 * cos(sa * 8 + t * 2.30 + ph);
    v = sin((sr - petal) * 7.93);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.25, vec3(0.59, 0.41, 0.49), vec3(0.42, 0.37, 0.46), vec3(1.15, 1.28, 0.78), vec3(0.57, 0.27, 0.90));
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
