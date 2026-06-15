uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.12 * cos(sa * 9 + t * 2.45 + ph);
    v = sin((sr - petal) * 17.14);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.07, vec3(0.51, 0.41, 0.53), vec3(0.49, 0.48, 0.45), vec3(1.38, 1.22, 1.33), vec3(0.68, 0.85, 0.89));
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
